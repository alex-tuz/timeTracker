'use client';

import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { format } from 'date-fns';
import type { TimeEntry, Project } from '@/lib/types';
import { TAILWIND, TIME_ENTRY } from '@/lib/constants';

interface TimeEntryFormProps {
  onEntryCreated: (entry: TimeEntry) => void;
  apiBaseUrl: string;
  projects: Project[];
}

export default function TimeEntryForm({
  onEntryCreated,
  apiBaseUrl,
  projects,
}: TimeEntryFormProps) {
  const [formData, setFormData] = useState({
    date: format(new Date(), 'yyyy-MM-dd'),
    projectId: projects[0]?.id ?? null,
    hours: TIME_ENTRY.DEFAULT_HOURS,
    description: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (projects.length > 0 && !formData.projectId) {
      setFormData((prev) => ({ ...prev, projectId: projects[0]?.id ?? null }));
    }
  }, [projects, formData.projectId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'hours'
          ? parseFloat(value)
          : name === 'projectId'
            ? Number(value)
            : value,
    }));
  };

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
      const response = await axios.post(`${apiBaseUrl}/time-entries`, formData);
      onEntryCreated(response.data);

      setFormData({
        date: format(new Date(), 'yyyy-MM-dd'),
        projectId: projects[0]?.id ?? null,
        hours: TIME_ENTRY.DEFAULT_HOURS,
        description: '',
      });

      setSuccess(true);
      setTimeout(() => setSuccess(false), TIME_ENTRY.SUCCESS_MESSAGE_DURATION);
    } catch (err) {
      const message =
        (err as AxiosError<{ message?: string }>)?.response?.data?.message ||
        'Failed to create time entry';
      setError(typeof message === 'string' ? message : 'Failed to create time entry');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={TAILWIND.card}>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Log Time Entry</h2>

      {error && <div className={TAILWIND.errorBox}>{error}</div>}
      {success && <div className={TAILWIND.successBox}>Time entry saved successfully!</div>}

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
            className={TAILWIND.input}
            required
          />
        </div>

        <div>
          <label htmlFor="project" className="block text-sm font-medium text-gray-700 mb-1">
            Project
          </label>
          {projects.length === 0 ? (
            <div className="text-sm text-gray-500">No projects available.</div>
          ) : (
            <select
              id="project"
              name="projectId"
              value={formData.projectId ?? ''}
              onChange={handleChange}
              className={TAILWIND.input}
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
            min={TIME_ENTRY.MIN_HOURS}
            max={TIME_ENTRY.MAX_HOURS}
            step={TIME_ENTRY.MIN_HOURS}
            className={TAILWIND.input}
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
            rows={TIME_ENTRY.TEXTAREA_ROWS}
            placeholder="Describe the work you did..."
            className={TAILWIND.input}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading || projects.length === 0}
          className={TAILWIND.button}
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
}
