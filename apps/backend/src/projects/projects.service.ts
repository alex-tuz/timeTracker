import { BadRequestException, Injectable } from '@nestjs/common';
import { db, initSchema } from '../database';
import { CreateProjectDto } from './create-project.dto';
import type { Project } from './project.interface';

@Injectable()
export class ProjectsService {
  constructor() {
    initSchema();
  }

  findAll(): Project[] {
    const stmt = db.prepare(`SELECT id, name, createdAt FROM projects ORDER BY name ASC`);
    return stmt.all() as Project[];
  }

  create(dto: CreateProjectDto): Project {
    const insertStmt = db.prepare(`INSERT INTO projects (name) VALUES (?)`);
    try {
      const result = insertStmt.run(dto.name) as { lastInsertRowid: number };
      const selectStmt = db.prepare(`SELECT id, name, createdAt FROM projects WHERE id = ?`);
      return selectStmt.get(result.lastInsertRowid) as Project;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      if (message.includes('UNIQUE')) {
        throw new BadRequestException('Project with this name already exists');
      }
      throw new BadRequestException(message);
    }
  }
}
