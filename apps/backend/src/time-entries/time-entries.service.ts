import { Injectable } from '@nestjs/common';
import { db, initSchema } from '../database';
import { CreateTimeEntryDto } from './create-time-entry.dto';
import { TimeEntry } from './time-entry.interface';

type DbRow = {
  id: number;
  date: string;
  project_id: number;
  project: string;
  hours: number;
  description: string;
  createdAt: string;
  updatedAt: string;
};

@Injectable()
export class TimeEntriesService {
  constructor() {
    initSchema();
  }

  create(createTimeEntryDto: CreateTimeEntryDto): TimeEntry {
    const { date, projectId, hours, description } = createTimeEntryDto;

    const projectExists = db
      .prepare(`SELECT id FROM projects WHERE id = ?`)
      .get(projectId) as { id: number } | undefined;

    if (!projectExists) {
      throw new Error('Project not found');
    }

    // Parse date to normalize it (remove time component for comparison)
    const entryDate = new Date(date);
    entryDate.setHours(0, 0, 0, 0);
    const dateString = entryDate.toISOString();

    // Check total hours for the day
    const dayStart = new Date(entryDate);
    dayStart.setHours(0, 0, 0, 0);

    const dayEnd = new Date(entryDate);
    dayEnd.setHours(23, 59, 59, 999);

    const stmt = db.prepare(`
      SELECT SUM(hours) as total FROM time_entry 
      WHERE date >= ? AND date <= ?
    `);

    const result = stmt.get(dayStart.toISOString(), dayEnd.toISOString()) as
      | { total: number }
      | undefined;
    const totalHours = (result?.total as number) || 0;

    if (totalHours + hours > 24) {
      throw new Error(
        `Cannot exceed 24 hours per day. Current: ${totalHours}h, Requested: ${hours}h`,
      );
    }

    const insertStmt = db.prepare(`
      INSERT INTO time_entry (date, project_id, hours, description, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const now = new Date().toISOString();
    const result2 = insertStmt.run(
      dateString,
      projectId,
      hours,
      description,
      now,
      now,
    ) as { lastInsertRowid: number };

    return this.findById(result2.lastInsertRowid);
  }

  private mapRow(row: DbRow): TimeEntry {
    return {
      id: row.id,
      date: row.date,
      projectId: row.project_id,
      project: row.project,
      hours: row.hours,
      description: row.description,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
  }

  findAll(): TimeEntry[] {
    const stmt = db.prepare(`
      SELECT te.id, te.date, te.project_id, p.name AS project, te.hours, te.description, te.createdAt, te.updatedAt
      FROM time_entry te
      JOIN projects p ON p.id = te.project_id
      ORDER BY te.date DESC
    `);
    const rows = stmt.all() as DbRow[];
    return rows.map((row) => this.mapRow(row));
  }

  findById(id: number): TimeEntry {
    const stmt = db.prepare(`
      SELECT te.id, te.date, te.project_id, p.name AS project, te.hours, te.description, te.createdAt, te.updatedAt
      FROM time_entry te
      JOIN projects p ON p.id = te.project_id
      WHERE te.id = ?
    `);
    const row = stmt.get(id) as DbRow | undefined;
    if (!row) {
      throw new Error('Time entry not found');
    }
    return this.mapRow(row);
  }

  findByDate(date: string): TimeEntry[] {
    const entryDate = new Date(date);
    entryDate.setHours(0, 0, 0, 0);

    const dayEnd = new Date(entryDate);
    dayEnd.setHours(23, 59, 59, 999);

    const stmt = db.prepare(`
      SELECT te.id, te.date, te.project_id, p.name AS project, te.hours, te.description, te.createdAt, te.updatedAt
      FROM time_entry te
      JOIN projects p ON p.id = te.project_id
      WHERE te.date >= ? AND te.date <= ?
      ORDER BY te.date DESC
    `);
    const rows = stmt.all(entryDate.toISOString(), dayEnd.toISOString()) as DbRow[];
    return rows.map((row) => this.mapRow(row));
  }

  remove(id: number): { success: boolean } {
    const stmt = db.prepare(`
      DELETE FROM time_entry WHERE id = ?
    `);
    stmt.run(id);
    return { success: true };
  }
}
