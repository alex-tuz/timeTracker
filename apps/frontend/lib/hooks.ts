import axios from 'axios';
import { useState, useCallback } from 'react';
import type { TimeEntry, Project } from './types';

export function useApiCall<T>(url: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get<T[]>(url);
      setData(response.data);
    } catch (err) {
      setError(`Failed to fetch from ${url}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [url]);

  return { data, loading, error, fetch };
}

export function useDelete(apiBaseUrl: string) {
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = useCallback(
    async (id: number, onSuccess?: () => void) => {
      setDeletingId(id);
      setError(null);
      try {
        await axios.delete(`${apiBaseUrl}/time-entries/${id}`);
        onSuccess?.();
      } catch (err) {
        setError('Failed to delete entry');
        console.error(err);
      } finally {
        setDeletingId(null);
      }
    },
    [apiBaseUrl],
  );

  return { deletingId, error, handleDelete };
}
