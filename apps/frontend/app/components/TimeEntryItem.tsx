import type { TimeEntry } from '@/lib/types';
import { formatHours } from '@/lib/utils';

interface TimeEntryItemProps {
  entry: TimeEntry;
  deletingId: number | null;
  onDelete: (id: number) => void;
}

export default function TimeEntryItem({
  entry,
  deletingId,
  onDelete,
}: TimeEntryItemProps) {
  return (
    <div className="flex justify-between items-start gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div className="flex-1">
        <div className="flex gap-4 mb-2">
          <span className="font-medium text-gray-900">{entry.project}</span>
          <span className="text-gray-600">{formatHours(entry.hours)}h</span>
        </div>
        <p className="text-sm text-gray-600">{entry.description}</p>
      </div>
      <button
        onClick={() => onDelete(entry.id)}
        disabled={deletingId === entry.id}
        className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 disabled:bg-gray-200 disabled:text-gray-500 transition-colors"
      >
        {deletingId === entry.id ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  );
}
