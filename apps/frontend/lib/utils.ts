import { format, parseISO } from 'date-fns';
import type { TimeEntry, GroupedEntries } from './types';

export function groupByDate(entries: TimeEntry[]): GroupedEntries {
  return entries.reduce((acc, entry) => {
    const date = format(parseISO(entry.date), 'yyyy-MM-dd');
    if (!acc[date]) acc[date] = [];
    acc[date].push(entry);
    return acc;
  }, {} as GroupedEntries);
}

export function calculateTotal(entries: TimeEntry[]): number {
  return entries.reduce((sum, entry) => sum + entry.hours, 0);
}

export function formatHours(hours: number): string {
  return hours.toFixed(2);
}
