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
const db = new Database(dbPath);

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

  async create(createTimeEntryDto: CreateTimeEntryDto) {
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
    
    const result = stmt.get(dayStart.toISOString(), dayEnd.toISOString()) as any;
    const totalHours = result?.total || 0;
    
    if (totalHours + hours > 24) {
      throw new Error(`Cannot exceed 24 hours per day. Current: ${totalHours}h, Requested: ${hours}h`);
    }
    
    const insertStmt = db.prepare(`
      INSERT INTO time_entry (date, project, hours, description, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    
    const now = new Date().toISOString();
    const result2 = insertStmt.run(dateString, project, hours, description, now, now) as any;
    
    return this.findById(result2.lastInsertRowid as number);
  }

  async findAll() {
    const stmt = db.prepare(`
      SELECT * FROM time_entry ORDER BY date DESC
    `);
    return stmt.all() as TimeEntry[];
  }

  async findById(id: number) {
    const stmt = db.prepare(`
      SELECT * FROM time_entry WHERE id = ?
    `);
    return stmt.get(id) as TimeEntry;
  }

  async findByDate(date: string) {
    const entryDate = new Date(date);
    entryDate.setHours(0, 0, 0, 0);
    
    const dayEnd = new Date(entryDate);
    dayEnd.setHours(23, 59, 59, 999);
    
    const stmt = db.prepare(`
      SELECT * FROM time_entry WHERE date >= ? AND date <= ? ORDER BY date DESC
    `);
    return stmt.all(entryDate.toISOString(), dayEnd.toISOString()) as TimeEntry[];
  }

  async remove(id: number) {
    const stmt = db.prepare(`
      DELETE FROM time_entry WHERE id = ?
    `);
    stmt.run(id);
    return { success: true };
  }
}
