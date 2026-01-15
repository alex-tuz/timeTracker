'use client';

import { useEffect } from 'react';
import DayGroup from './DayGroup';
import { useDelete } from '@/lib/hooks';
import { groupByDate, calculateTotal, formatHours } from '@/lib/utils';
import type { TimeEntry } from '@/lib/types';

interface TimeEntryHistoryProps {
  entries: TimeEntry[];
  loading: boolean;
  onEntryDeleted: (id: number) => void;
  apiBaseUrl: string;
}

export default function TimeEntryHistory({
  entries,
  loading,
  onEntryDeleted,
  apiBaseUrl,
}: TimeEntryHistoryProps) {
  const { deletingId, error, handleDelete } = useDelete(apiBaseUrl);

  const onDelete = (id: number) => {
    handleDelete(id, () => onEntryDeleted(id));
  };

  if (loading && entries.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Entry History</h2>
        <p className="text-gray-500">Loading entries...</p>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Entry History</h2>
        <p className="text-gray-500">No time entries yet. Create one to get started!</p>
      </div>
    );
  }

  const grouped = groupByDate(entries);
  const sortedDates = Object.keys(grouped).sort().reverse();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Entry History</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      <div className="space-y-6">
        {sortedDates.map((date) => (
          <DayGroup
            key={date}
            date={date}
            entries={grouped[date]}
            deletingId={deletingId}
            onDelete={onDelete}
          />
        ))}
      </div>

      <div className="mt-6 pt-6 border-t bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-900">Grand Total</span>
          <span className="text-2xl font-bold text-blue-600">
            {formatHours(calculateTotal(entries))}h
          </span>
        </div>
      </div>
    </div>
  );
}
