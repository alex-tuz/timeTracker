'use client';

import { useState } from 'react';
import axios from 'axios';
import { format, parseISO } from 'date-fns';

interface TimeEntry {
  id: number;
  date: string;
  project: string;
  hours: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface TimeEntryHistoryProps {
  entries: TimeEntry[];
  loading: boolean;
  onEntryDeleted: (id: number) => void;
  apiBaseUrl: string;
}

interface GroupedEntries {
  [date: string]: TimeEntry[];
}

export default function TimeEntryHistory({
  entries,
  loading,
  onEntryDeleted,
  apiBaseUrl,
}: TimeEntryHistoryProps) {
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const groupByDate = (entries: TimeEntry[]): GroupedEntries => {
    return entries.reduce((acc, entry) => {
      const date = format(parseISO(entry.date), 'yyyy-MM-dd');
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(entry);
      return acc;
    }, {} as GroupedEntries);
  };

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    setDeleteError(null);

    try {
      await axios.delete(`${apiBaseUrl}/time-entries/${id}`);
      onEntryDeleted(id);
    } catch (err) {
      setDeleteError('Failed to delete entry');
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  const groupedEntries = groupByDate(entries);
  const sortedDates = Object.keys(groupedEntries).sort().reverse();

  const calculateDayTotal = (dayEntries: TimeEntry[]): number => {
    return dayEntries.reduce((sum, entry) => sum + entry.hours, 0);
  };

  const calculateGrandTotal = (): number => {
    return entries.reduce((sum, entry) => sum + entry.hours, 0);
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

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Entry History</h2>

      {deleteError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {deleteError}
        </div>
      )}

      <div className="space-y-6">
        {sortedDates.map((date) => {
          const dayEntries = groupedEntries[date];
          const dayTotal = calculateDayTotal(dayEntries);

          return (
            <div key={date} className="border-t pt-6 first:border-t-0 first:pt-0">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {format(parseISO(date), 'EEEE, MMMM d, yyyy')}
                </h3>
                <span className="text-lg font-semibold text-blue-600">
                  {dayTotal.toFixed(2)}h total
                </span>
              </div>

              <div className="space-y-3">
                {dayEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className="flex justify-between items-start gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex gap-4 mb-2">
                        <span className="font-medium text-gray-900">{entry.project}</span>
                        <span className="text-gray-600">{entry.hours.toFixed(2)}h</span>
                      </div>
                      <p className="text-sm text-gray-600">{entry.description}</p>
                    </div>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      disabled={deletingId === entry.id}
                      className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 disabled:bg-gray-200 disabled:text-gray-500 transition-colors"
                    >
                      {deletingId === entry.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-6 border-t bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-900">Grand Total</span>
          <span className="text-2xl font-bold text-blue-600">
            {calculateGrandTotal().toFixed(2)}h
          </span>
        </div>
      </div>
    </div>
  );
}
