import { Injectable } from '@nestjs/common';
import Database from 'better-sqlite3';
import { CreateTimeEntryDto } from './create-time-entry.dto';
import { TimeEntry } from './time-entry.interface';
import * as path from 'path';
import * as fs from 'fs';

const dbDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}
const dbPath = path.join(dbDir, 'dev.db');
const db: any = new Database(dbPath);

@Injectable()
export class TimeEntriesService {
  constructor() {
    // Ensure database tables exist
    db.exec(`
      CREATE TABLE IF NOT EXISTS time_entry (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date DATETIME NOT NULL,
        project TEXT NOT NULL,
        hours REAL NOT NULL,
        description TEXT NOT NULL,
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE INDEX IF NOT EXISTS idx_date ON time_entry(date);
    `);
  }

  create(createTimeEntryDto: CreateTimeEntryDto): TimeEntry {
    const { date, project, hours, description } = createTimeEntryDto;

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
      INSERT INTO time_entry (date, project, hours, description, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const now = new Date().toISOString();
    const result2 = insertStmt.run(
      dateString,
      project,
      hours,
      description,
      now,
      now,
    ) as { lastInsertRowid: number };

    return this.findById(result2.lastInsertRowid);
  }

  findAll(): TimeEntry[] {
    const stmt = db.prepare(`
      SELECT * FROM time_entry ORDER BY date DESC
    `);
    return stmt.all() as TimeEntry[];
  }

  findById(id: number): TimeEntry {
    const stmt = db.prepare(`
      SELECT * FROM time_entry WHERE id = ?
    `);
    return stmt.get(id) as TimeEntry;
  }

  findByDate(date: string): TimeEntry[] {
    const entryDate = new Date(date);
    entryDate.setHours(0, 0, 0, 0);

    const dayEnd = new Date(entryDate);
    dayEnd.setHours(23, 59, 59, 999);

    const stmt = db.prepare(`
      SELECT * FROM time_entry WHERE date >= ? AND date <= ? ORDER BY date DESC
    `);
    return stmt.all(
      entryDate.toISOString(),
      dayEnd.toISOString(),
    ) as TimeEntry[];
  }

  remove(id: number): { success: boolean } {
    const stmt = db.prepare(`
      DELETE FROM time_entry WHERE id = ?
    `);
    stmt.run(id);
    return { success: true };
  }
}
