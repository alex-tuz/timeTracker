import Database from 'better-sqlite3';
import type { Database as DatabaseInstance } from 'better-sqlite3';
import * as fs from 'fs';
import * as path from 'path';

const dbDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, 'dev.db');
export const db: DatabaseInstance = new Database(dbPath);

type TableInfoRow = {
  name: string;
};

type LegacyTimeEntryRow = {
  id: number;
  date: string;
  project: string;
  hours: number;
  description: string;
  createdAt?: string;
  updatedAt?: string;
};

type ProjectRow = {
  id: number;
};

function ensureProjectsTable(): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

function seedDefaultProjects(): void {
  const row = db
    .prepare(`SELECT COUNT(*) as count FROM projects`)
    .get() as { count: number } | undefined;

  if (!row || row.count > 0) {
    return;
  }

  const defaults = [
    'Viso Internal',
    'Client A',
    'Client B',
    'Personal Development',
    'Research',
  ];

  const insert = db.prepare(`INSERT OR IGNORE INTO projects (name) VALUES (?)`);
  const tx = db.transaction(() => {
    for (const name of defaults) {
      insert.run(name);
    }
  });
  tx();
}

function hasProjectIdColumn(): boolean {
  const info = db
    .prepare(`PRAGMA table_info(time_entry)`) // eslint-disable-line sonarjs/no-duplicate-string
    .all() as TableInfoRow[];
  return info.some((row) => row.name === 'project_id');
}

function migrateLegacyProjectColumn(): void {
  const tableInfo = db.prepare(`PRAGMA table_info(time_entry)`).all() as TableInfoRow[];
  if (tableInfo.length === 0 || hasProjectIdColumn()) {
    return;
  }

  // Seed projects from legacy text field
  const legacyProjects = db
    .prepare(`SELECT DISTINCT project FROM time_entry`)
    .all() as { project: string }[];
  const insertProject = db.prepare(`INSERT OR IGNORE INTO projects (name) VALUES (?)`);
  const insertProjectsTx = db.transaction((projects: { project: string }[]) => {
    for (const row of projects) {
      if (row.project) {
        insertProject.run(row.project);
      }
    }
  });
  insertProjectsTx(legacyProjects);

  // Create new table with project_id
  db.exec(`
    CREATE TABLE time_entry_new (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date DATETIME NOT NULL,
      project_id INTEGER NOT NULL,
      hours REAL NOT NULL,
      description TEXT NOT NULL,
      createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE RESTRICT ON UPDATE CASCADE
    );
  `);

  const legacyRows = db
    .prepare(
      `SELECT id, date, project, hours, description, createdAt, updatedAt FROM time_entry`,
    )
    .all() as LegacyTimeEntryRow[];

  const selectProjectId = db.prepare(`SELECT id FROM projects WHERE name = ?`);
  const insertTimeEntry = db.prepare(`
    INSERT INTO time_entry_new (id, date, project_id, hours, description, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const migrateTx = db.transaction(() => {
    for (const row of legacyRows) {
      const found = selectProjectId.get(row.project) as ProjectRow | undefined;
      let projectId = found?.id;

      if (!projectId) {
        const inserted = insertProject.run(row.project || 'Unknown Project') as {
          lastInsertRowid: number;
        };
        projectId = Number(inserted.lastInsertRowid);
      }

      insertTimeEntry.run(
        row.id,
        row.date,
        projectId,
        row.hours,
        row.description,
        row.createdAt ?? new Date().toISOString(),
        row.updatedAt ?? new Date().toISOString(),
      );
    }
  });

  migrateTx();

  db.exec(`DROP TABLE time_entry`);
  db.exec(`ALTER TABLE time_entry_new RENAME TO time_entry`);
}

export function initSchema(): void {
  ensureProjectsTable();
  seedDefaultProjects();
  migrateLegacyProjectColumn();

  db.exec(`
    CREATE TABLE IF NOT EXISTS time_entry (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date DATETIME NOT NULL,
      project_id INTEGER NOT NULL,
      hours REAL NOT NULL,
      description TEXT NOT NULL,
      createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE RESTRICT ON UPDATE CASCADE
    );
    CREATE INDEX IF NOT EXISTS idx_date ON time_entry(date);
    CREATE INDEX IF NOT EXISTS idx_project_id ON time_entry(project_id);
  `);
}
