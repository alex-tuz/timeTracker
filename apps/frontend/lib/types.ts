export interface TimeEntry {
  id: number;
  date: string;
  projectId: number;
  project: string;
  hours: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: number;
  name: string;
  createdAt: string;
}

export interface GroupedEntries {
  [date: string]: TimeEntry[];
}
