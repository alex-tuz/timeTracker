"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeEntriesService = void 0;
const common_1 = require("@nestjs/common");
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const dbDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}
const dbPath = path.join(dbDir, 'dev.db');
const db = new better_sqlite3_1.default(dbPath);
let TimeEntriesService = class TimeEntriesService {
    constructor() {
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
    async create(createTimeEntryDto) {
        const { date, project, hours, description } = createTimeEntryDto;
        const entryDate = new Date(date);
        entryDate.setHours(0, 0, 0, 0);
        const dateString = entryDate.toISOString();
        const dayStart = new Date(entryDate);
        dayStart.setHours(0, 0, 0, 0);
        const dayEnd = new Date(entryDate);
        dayEnd.setHours(23, 59, 59, 999);
        const stmt = db.prepare(`
      SELECT SUM(hours) as total FROM time_entry 
      WHERE date >= ? AND date <= ?
    `);
        const result = stmt.get(dayStart.toISOString(), dayEnd.toISOString());
        const totalHours = result?.total || 0;
        if (totalHours + hours > 24) {
            throw new Error(`Cannot exceed 24 hours per day. Current: ${totalHours}h, Requested: ${hours}h`);
        }
        const insertStmt = db.prepare(`
      INSERT INTO time_entry (date, project, hours, description, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
        const now = new Date().toISOString();
        const result2 = insertStmt.run(dateString, project, hours, description, now, now);
        return this.findById(result2.lastInsertRowid);
    }
    async findAll() {
        const stmt = db.prepare(`
      SELECT * FROM time_entry ORDER BY date DESC
    `);
        return stmt.all();
    }
    async findById(id) {
        const stmt = db.prepare(`
      SELECT * FROM time_entry WHERE id = ?
    `);
        return stmt.get(id);
    }
    async findByDate(date) {
        const entryDate = new Date(date);
        entryDate.setHours(0, 0, 0, 0);
        const dayEnd = new Date(entryDate);
        dayEnd.setHours(23, 59, 59, 999);
        const stmt = db.prepare(`
      SELECT * FROM time_entry WHERE date >= ? AND date <= ? ORDER BY date DESC
    `);
        return stmt.all(entryDate.toISOString(), dayEnd.toISOString());
    }
    async remove(id) {
        const stmt = db.prepare(`
      DELETE FROM time_entry WHERE id = ?
    `);
        stmt.run(id);
        return { success: true };
    }
};
exports.TimeEntriesService = TimeEntriesService;
exports.TimeEntriesService = TimeEntriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], TimeEntriesService);
//# sourceMappingURL=time-entries.service.js.map