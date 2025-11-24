# Hai-Wiki-Projekt AI Agent Instructions

## Architecture Overview

This is a **full-stack shark encyclopedia application** with a React/Vite frontend and Express/Prisma backend. The database schema is shark-centric with `Shark`, `Habitat`, `Diet`, and `Observation` models in a relational structure.

**Key structural decision**: Backend and frontend are separate monorepo packages, each with their own `package.json` and dev servers. They communicate via REST APIs (backend on port 3001, frontend default Vite ports).

## Critical Developer Workflows

### Starting the Application

```bash
# Backend (from backend/ directory)
npm run dev          # Node watch mode, auto-restarts on changes
npm run seed         # Populate database with shark data

# Frontend (from frontend/ directory)
npm run dev          # Vite dev server with HMR
```

### Database Setup (Prisma)

The project uses **Prisma ORM with PostgreSQL**. Database connection requires a `.env` file in `backend/`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/Hai-Wiki"
```

**First-time setup**:

1. Ensure PostgreSQL is running locally
2. Database must be created manually: `createdb -U postgres Hai-Wiki`
3. Run `npx prisma db push` (from `backend/`) to sync schema
4. Run `npm run seed` to populate with sample data
5. Use `npx prisma studio` to browse data in GUI

**Critical**: The schema already exists in `backend/prisma/schema.prisma`. Don't run `prisma db pull` - the schema drives the database, not vice versa.

## Project-Specific Conventions

### Backend (Express + Prisma)

- **PrismaClient instantiation**: Import from `@prisma/client` directly in `server.js`, not from `prisma/client.js`
- **BigInt serialization**: Required for `lifespan_years` field - already implemented via `BigInt.prototype.toJSON` in `server.js`
- **Error handling**: Central error handler at bottom of `server.js` expects errors with `.status` and `.message` properties
- **CORS**: Wide-open (`cors()`) for development - tighten for production
- **Module system**: Uses ES modules (`"type": "module"` in `package.json`)

### Frontend (React + Vite)

- **Context pattern**: User state managed via `UserContextProvider` in `context/UserContext.jsx`
  - Wrap components with `<UserContextProvider>` in `main.jsx` (already done)
  - Access via `useUser()` hook (see `Login.jsx` example)
- **Styling**: Uses Tailwind CSS v4 with Vite plugin (`@tailwindcss/vite`)
- **ESLint**: Configured for React 19 with hooks plugin - disable specific rules with inline comments (see `UserContext.jsx` for `react-refresh/only-export-components` example)

### API Communication

- **Backend base**: `http://localhost:3001`
- **Existing endpoints**:
  - `GET /sharks/all` - Returns all sharks with relations
  - `GET /sharks?searchterm=<name>` - Search sharks by name (case-insensitive `contains`)
- **Pattern**: Use query params for filters (`req.query`), not route params
- **No API client library**: Use native `fetch()` from frontend

### Database Schema Relationships

```
Shark (main entity)
├── habitat_id → Habitat (region, temperature, depth)
├── diet_id → Diet (diet_type, prey_example)
└── Observation[] (location, date, measurements, notes)
```

**Important**: `Shark.lifespan_years` is `BigInt` type, requiring serialization override (already handled).

## Incomplete/Placeholder Features

- **Authentication**: `userController.js` and login routes are stubbed but not implemented
  - Endpoint `/login` is commented out in `server.js`
  - Frontend `Login.jsx` has UI but no backend integration
  - **TODO**: Implement password hashing (bcrypt), JWT tokens, and user model
- **No environment switching**: Frontend doesn't have different API URLs for dev/prod
- **No tests**: Test scripts exit with error in both frontend/backend

## Key Files Reference

- `backend/server.js` - Main Express app, API routes, error handling
- `backend/prisma/schema.prisma` - Database schema (source of truth)
- `backend/prisma/seed.js` - 369 lines of comprehensive seed data (habitats, diets, sharks, observations)
- `frontend/src/context/UserContext.jsx` - Global user state pattern
- `backend/README_Prisma.md` - Detailed Prisma setup guide (German, keep updated)

## Language & Comments

Project comments and documentation are primarily in **German** - maintain this convention when adding comments or documentation.
