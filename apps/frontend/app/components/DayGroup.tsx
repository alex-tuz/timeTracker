import { format, parseISO } from 'date-fns';
import type { TimeEntry } from '@/lib/types';
import TimeEntryItem from './TimeEntryItem';
import { calculateTotal, formatHours } from '@/lib/utils';

interface DayGroupProps {
  date: string;
  entries: TimeEntry[];
  deletingId: number | null;
  onDelete: (id: number) => void;
}

export default function DayGroup({
  date,
  entries,
  deletingId,
  onDelete,
}: DayGroupProps) {
  const dayTotal = calculateTotal(entries);

  return (
    <div className="border-t pt-6 first:border-t-0 first:pt-0">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {format(parseISO(date), 'EEEE, MMMM d, yyyy')}
        </h3>
        <span className="text-lg font-semibold text-blue-600">
          {formatHours(dayTotal)} total
        </span>
      </div>
      <div className="space-y-3">
        {entries.map((entry) => (
          <TimeEntryItem
            key={entry.id}
            entry={entry}
            deletingId={deletingId}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
