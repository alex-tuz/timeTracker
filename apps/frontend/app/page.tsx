'use client';

import { useState, useEffect } from 'react';
import TimeEntryForm from './components/TimeEntryForm';
import TimeEntryHistory from './components/TimeEntryHistory';
import axios from 'axios';

interface TimeEntry {
  id: number;
  date: string;
  projectId: number;
  project: string;
  hours: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface Project {
  id: number;
  name: string;
  createdAt: string;
}

const API_BASE_URL = 'http://localhost:3001/api';

export default function Home() {
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(false);
  const [projectsError, setProjectsError] = useState<string | null>(null);

  const fetchEntries = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_BASE_URL}/time-entries`);
      setEntries(response.data);
    } catch (err) {
      setError('Failed to fetch time entries');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      setProjectsLoading(true);
      setProjectsError(null);
      const response = await axios.get(`${API_BASE_URL}/projects`);
      setProjects(response.data);
    } catch (err) {
      setProjectsError('Failed to load projects');
      console.error(err);
    } finally {
      setProjectsLoading(false);
    }
  };

  useEffect(() => {
    void fetchProjects();
    void fetchEntries();
  }, []);

  const handleEntryCreated = async (newEntry: TimeEntry) => {
    setEntries([newEntry, ...entries]);
  };

  const handleEntryDeleted = async (id: number) => {
    setEntries(entries.filter((entry) => entry.id !== id));
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
