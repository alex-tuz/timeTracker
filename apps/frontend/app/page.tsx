'use client';

import { useEffect } from 'react';
import TimeEntryForm from './components/TimeEntryForm';
import TimeEntryHistory from './components/TimeEntryHistory';
import { useApiCall } from '@/lib/hooks';
import { API_BASE_URL } from '@/lib/constants';
import type { TimeEntry, Project } from '@/lib/types';

export default function Home() {
  const {
    data: entries,
    loading,
    error,
    fetch: fetchEntries,
  } = useApiCall<TimeEntry>(`${API_BASE_URL}/time-entries`);

  const {
    data: projects,
    loading: projectsLoading,
    error: projectsError,
    fetch: fetchProjects,
  } = useApiCall<Project>(`${API_BASE_URL}/projects`);

  useEffect(() => {
    void fetchProjects();
    void fetchEntries();
  }, [fetchEntries, fetchProjects]);

  const handleEntryCreated = (newEntry: TimeEntry) => {
    fetchEntries();
  };

  const handleEntryDeleted = (id: number) => {
    fetchEntries();
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-12">Mini Time Tracker</h1>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <TimeEntryForm
              onEntryCreated={handleEntryCreated}
              apiBaseUrl={API_BASE_URL}
              projects={projects}
            />
            {projectsLoading && (
              <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded text-gray-700 text-sm">
                Loading projects...
              </div>
            )}
            {projectsError && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                {projectsError}
              </div>
            )}
          </div>

          <div className="lg:col-span-2">
            <TimeEntryHistory
              entries={entries}
              loading={loading}
              onEntryDeleted={handleEntryDeleted}
              apiBaseUrl={API_BASE_URL}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
