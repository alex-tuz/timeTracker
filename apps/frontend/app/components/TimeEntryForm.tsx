'use client';

import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { format } from 'date-fns';

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

interface TimeEntryFormProps {
  onEntryCreated: (entry: TimeEntry) => void;
  apiBaseUrl: string;
  projects: Project[];
}

export default function TimeEntryForm({ onEntryCreated, apiBaseUrl, projects }: TimeEntryFormProps) {
  const [formData, setFormData] = useState({
    date: format(new Date(), 'yyyy-MM-dd'),
    projectId: projects[0]?.id ?? null,
    hours: 1,
    description: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'hours' ? parseFloat(value) : name === 'projectId' ? Number(value) : value,
    }));
  };

  useEffect(() => {
    if (projects.length > 0 && !formData.projectId) {
      setFormData((prev) => ({ ...prev, projectId: projects[0]?.id ?? null }));
    }
  }, [projects, formData.projectId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    if (!formData.projectId) {
      setError('Please select a project');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${apiBaseUrl}/time-entries`, {
        date: formData.date,
        projectId: formData.projectId,
        hours: formData.hours,
        description: formData.description,
      });

      onEntryCreated(response.data);
      
      // Reset form
      setFormData({
        date: format(new Date(), 'yyyy-MM-dd'),
        projectId: projects[0]?.id ?? null,
        hours: 1,
        description: '',
      });

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      const message = (err as AxiosError<{ message?: string }>)?.response?.data?.message || 'Failed to create time entry';
      setError(typeof message === 'string' ? message : 'Failed to create time entry');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Log Time Entry</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
          Time entry saved successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="project" className="block text-sm font-medium text-gray-700 mb-1">
            Project
          </label>
          {projects.length === 0 ? (
            <div className="text-sm text-gray-500">No projects available. Please add a project first.</div>
          ) : (
            <select
              id="project"
              name="projectId"
              value={formData.projectId ?? ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          )}
        </div>

        <div>
          <label htmlFor="hours" className="block text-sm font-medium text-gray-700 mb-1">
            Hours
          </label>
          <input
            type="number"
            id="hours"
            name="hours"
            value={formData.hours}
            onChange={handleChange}
            min="0.25"
            max="24"
            step="0.25"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Work Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            placeholder="Describe the work you did..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading || projects.length === 0}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
}
