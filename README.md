# Mini Time Tracker

A full-stack time tracking application built with Next.js (frontend) and NestJS (backend), featuring SQLite database integration.

## Features

✨ **Time Entry Management**
- Create time entries with date, project, hours, and description
- View entries organized by date with daily totals
- Delete entries
- Maximum 24 hours per calendar date validation

✨ **Tech Stack**
- **Frontend**: Next.js 16 with React 19, TypeScript, Tailwind CSS
- **Backend**: NestJS with Express, TypeScript
- **Database**: SQLite with better-sqlite3
- **Validation**: class-validator for DTO validation
- **HTTP**: Axios for API communication

## Project Structure

```
mini-time-tracker/
├── apps/
│   ├── backend/                 # NestJS REST API
│   │   ├── src/
│   │   │   ├── projects/        # Projects module
│   │   │   │   ├── create-project.dto.ts
│   │   │   │   ├── projects.controller.ts
│   │   │   │   ├── projects.service.ts
│   │   │   │   ├── projects.module.ts
│   │   │   │   └── project.interface.ts
│   │   │   ├── time-entries/   # Time entry module
│   │   │   │   ├── create-time-entry.dto.ts
│   │   │   │   ├── time-entries.controller.ts
│   │   │   │   ├── time-entries.service.ts
│   │   │   │   ├── time-entries.module.ts
│   │   │   │   └── time-entry.interface.ts
│   │   │   ├── database.ts      # Shared DB setup & migrations
│   │   │   ├── app.module.ts
│   │   │   ├── app.service.ts
│   │   │   └── main.ts
│   │   ├── data/
│   │   │   └── dev.db           # SQLite database
│   │   └── package.json
│   │
│   └── frontend/                # Next.js application
│       ├── app/
│       │   ├── components/
│       │   │   ├── TimeEntryForm.tsx      # Form component
│       │   │   ├── TimeEntryHistory.tsx   # History display
│       │   │   ├── TimeEntryItem.tsx      # Single entry item
│       │   │   └── DayGroup.tsx           # Day grouping
│       │   ├── layout.tsx
│       │   ├── page.tsx                   # Main page
│       │   └── globals.css
│       ├── lib/
│       │   ├── types.ts         # TypeScript interfaces
│       │   ├── constants.ts      # App constants & config
│       │   ├── hooks.ts         # Custom React hooks
│       │   ├── utils.ts         # Utility functions
│       │   └── styles.ts        # CSS constants
│       ├── public/
│       └── package.json
│
├── package.json                # Root workspace config
└── README.md
```

## Architecture

### Backend (NestJS)

**REST API** running on `http://localhost:3001`

**Modules**:
- `ProjectsModule` - Manages project references
  - **Controller** - Project CRUD endpoints
  - **Service** - Database operations for projects
  - **DTO** - Data validation with class-validator

- `TimeEntriesModule` - Handles all time entry operations
  - **Controller** - REST endpoint handlers
  - **Service** - Business logic and database operations (includes 24h/day validation)
  - **DTO** - Data validation with class-validator

**Database Schema**:
```
projects
├── id (INTEGER PRIMARY KEY)
├── name (TEXT NOT NULL UNIQUE)
└── createdAt (DATETIME)

time_entry
├── id (INTEGER PRIMARY KEY)
├── date (DATETIME NOT NULL)
├── project_id (INTEGER NOT NULL, FK → projects.id)
├── hours (REAL NOT NULL)
├── description (TEXT NOT NULL)
├── createdAt (DATETIME)
└── updatedAt (DATETIME)
```

**Default Projects** (auto-seeded on first run):
- Viso Internal
- Client A
- Client B
- Personal Development
- Research

**API Endpoints**:
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create new project
- `POST /api/time-entries` - Create new time entry
- `GET /api/time-entries` - Get all entries
- `GET /api/time-entries/by-date?date=YYYY-MM-DD` - Filter by date
- `DELETE /api/time-entries/:id` - Delete entry

### Frontend (Next.js)

**Application** running on `http://localhost:3000`

**Components**:
- `TimeEntryForm` - Input form for new entries
  - Date picker (defaults to today)
  - Project dropdown selection (fetched from backend)
  - Hours input (0.25-24 range)
  - Description textarea
  - Error/success feedback
  - Validation for required fields

- `TimeEntryHistory` - Display grouped entries
  - Entries grouped by date with day components
  - Daily totals
  - Grand total across all entries
  - Delete functionality

- `DayGroup` - Groups entries by day
  - Renders day header with daily total
  - Displays entries for that day

- `TimeEntryItem` - Single entry component
  - Project name, hours, description
  - Delete button with loading state

**State Management & Utilities**:
- React hooks (useState, useEffect)
- Custom hooks: `useApiCall()` (data fetching), `useDelete()` (deletion logic)
- Axios for API communication
- date-fns for date formatting
- Utility functions for grouping, calculations, formatting

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm 9+

### Installation

1. **Clone or setup the project**
```bash
cd timeTracker
```

2. **Install dependencies** (monorepo workspace)
```bash
npm install
```

This installs dependencies for both backend and frontend.

### Database Setup

The SQLite database is automatically created on first backend startup:

```bash
# Database will be created at: apps/backend/data/dev.db
```

### Running the Application

#### Option 1: Run both apps from root
```bash
npm run dev
```

#### Option 2: Run separately

**Terminal 1 - Backend (NestJS)**
```bash
cd apps/backend
npm run start:dev
```
Backend will be available at `http://localhost:3001`

**Terminal 2 - Frontend (Next.js)**
```bash
cd apps/frontend
npm run dev
```
Frontend will be available at `http://localhost:3000`

### Build for Production

```bash
# Build both apps
npm run build

# Build individually
cd apps/backend && npm run build
cd apps/frontend && npm run build
```

## Usage

1. **Open the application**
   - Navigate to `http://localhost:3000`

2. **Create a time entry**
   - Select date (defaults to today)
   - Choose project from dropdown
   - Enter hours (0.25 to 24)
   - Add work description
   - Click "Save"

3. **View entries**
   - Entries are displayed grouped by date
   - Daily totals and grand total are calculated automatically
   - Delete button available for each entry

## Validation Rules

- ✅ Date: Required, must be valid ISO date
- ✅ Project: Required, selected from predefined list
- ✅ Hours: Required, must be between 0.25 and 24
- ✅ Description: Required, text describing the work
- ✅ Maximum 24 hours per calendar day

## Technology Details

### Backend Dependencies
- `@nestjs/core` - NestJS framework
- `@nestjs/common` - Common utilities
- `@nestjs/platform-express` - Express adapter
- `better-sqlite3` - SQLite driver
- `class-validator` - DTO validation
- `class-transformer` - DTO transformation

### Frontend Dependencies
- `next` - React framework
- `react` - UI library
- `axios` - HTTP client
- `date-fns` - Date utilities
- `tailwindcss` - CSS framework

## Code Quality

- ✅ **TypeScript** - Full type safety
- ✅ **ESLint** - Code linting
- ✅ **Prettier** - Code formatting
- ✅ **Validation** - DTO and business logic validation
- ✅ **Error Handling** - Proper error messages and feedback

## Development

### Run Linter
```bash
cd apps/backend
npm run lint

cd apps/frontend
npm run lint
```

### Run Tests
```bash
npm run test
npm run test:e2e
```

## Troubleshooting

**Port already in use**
- Backend (3001): Check with `netstat -ano | findstr :3001`
- Frontend (3000): Check with `netstat -ano | findstr :3000`

**Database connection error**
- Ensure `apps/backend/data/` directory exists
- Delete `dev.db` and restart backend to recreate

**CORS errors**
- Ensure backend is running on port 3001
- Check CORS configuration in `apps/backend/src/main.ts`

## Git Commit History

The project maintains a clean git history with conventional commits:

```
fix: resolve all ESLint errors and improve type safety
build: configure project dependencies and git ignore
feat(frontend): create main page with entry form and history
feat(frontend): create TimeEntryForm component
feat(database): configure SQLite database with Prisma
feat(backend): setup NestJS application with CORS and validation
feat(backend): create TimeEntry controller with REST endpoints
feat(backend): implement TimeEntry service with validation
feat(backend): add TimeEntry DTO with validation
Initial commit: Mini Time Tracker application setup
```

View full history: `git log --oneline`

## License

MIT
