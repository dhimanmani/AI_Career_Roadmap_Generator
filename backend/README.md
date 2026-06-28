# ACRG Backend API

Production-ready backend for the **AI Career Roadmap Generator** platform.

## Tech Stack

- **Runtime:** Node.js + Express + TypeScript
- **Database:** PostgreSQL + Prisma ORM
- **Auth:** JWT + Refresh Tokens + RBAC
- **Cache:** Redis
- **Jobs:** BullMQ
- **AI:** OpenAI API (validated with Zod)
- **Storage:** Cloudinary
- **Docs:** Swagger/OpenAPI
- **Tests:** Jest + Supertest
- **Deploy:** Node.js (native) — PM2 / Railway / Render

## Quick Start

### 1. Start infrastructure (native)

**PostgreSQL 16** must be installed and running locally:

```bash
# macOS
brew install postgresql@16 && brew services start postgresql@16

# Ubuntu / Debian
sudo apt install postgresql-16 && sudo systemctl start postgresql

# Windows — download installer from https://www.postgresql.org/download/windows/
# or: winget install PostgreSQL.PostgreSQL.16
```

Create the database role and database (run once):

```sql
-- Connect as superuser: psql -U postgres
CREATE ROLE acrg WITH LOGIN PASSWORD 'acrg_secret';
CREATE DATABASE acrg_db OWNER acrg;
GRANT ALL PRIVILEGES ON DATABASE acrg_db TO acrg;
```

**Redis 7** must be installed and running on port 6379:

```bash
# macOS
brew install redis && brew services start redis

# Ubuntu / Debian
sudo apt install redis-server && sudo systemctl start redis-server

# Windows — use WSL2 (recommended) or Memurai (https://www.memurai.com/)
# Inside WSL: sudo apt install redis-server && sudo service redis start
```

### 2. Configure environment

```bash
cp .env.example .env
# Edit .env — fill in JWT_ACCESS_SECRET and JWT_REFRESH_SECRET (min 32 chars each)
# DATABASE_URL and REDIS_URL already point to localhost — no change needed
```

### 3. Install, migrate & seed

```bash
npm install
npx prisma migrate dev --name init
npm run prisma:seed
```

### 4. Run development server

```bash
npm run dev
```

API: `http://localhost:4000/api/v1`  
Swagger: `http://localhost:4000/api-docs`  
Health: `http://localhost:4000/health`

## Production Build

```bash
# Build the TypeScript source (Prisma client is auto-generated via postinstall)
npm run build

# Start with automatic migration + server (replaces the old Dockerfile CMD)
npm run start:prod
```

> **`postinstall` hook**: Running `npm install` now automatically runs `prisma generate`, so the Prisma client is always up-to-date after dependency installs.
>
> **`start:prod`**: Runs `prisma migrate deploy` then starts the server — equivalent to what the old `Dockerfile CMD` did automatically.

## Architecture

```
src/
├── config/          # Env, logger, redis, swagger
├── common/          # Errors, permissions, types
├── middleware/      # Auth, RBAC, validation, rate limiting
├── auth/            # Authentication module
├── modules/         # Domain modules (clean architecture)
├── ai/              # OpenAI service + prompt templates
├── jobs/            # BullMQ queues & workers
├── database/        # Prisma client
├── routes/          # API route aggregator
├── utils/           # Helpers
└── app.ts           # Express application
```

Each module follows: **Routes → Controller → Service → Repository**

## Roles & Permissions

| Role              | Capabilities                                      |
|-------------------|---------------------------------------------------|
| STUDENT           | Profile, goals, roadmaps, progress, evidence      |
| MENTOR            | Review roadmaps, feedback, approve milestones     |
| PLACEMENT_OFFICER | Reports, analytics, progress viewing                |
| ADMIN             | Full system access                                |

## API Modules

| Module           | Prefix               |
|------------------|----------------------|
| Auth             | `/auth`              |
| Users            | `/users`             |
| Profiles         | `/profiles`          |
| Career Goals     | `/career-goals`      |
| Skills           | `/skills`, `/user-skills` |
| Gap Analysis     | `/gap-analysis`      |
| Roadmaps         | `/roadmaps`          |
| Milestones       | `/milestones`        |
| Progress         | `/progress`          |
| Mentor Reviews   | `/mentor-reviews`    |
| Notifications    | `/notifications`     |
| Analytics        | `/analytics`         |
| Admin            | `/admin`             |
| Projects         | `/projects`          |

## Testing

```bash
npm test
```

Unit tests cover gap analysis engine, AI schema validation, RBAC, and auth integration.

## Background Jobs

| Queue                  | Purpose                    |
|------------------------|----------------------------|
| roadmap-generation     | Async AI roadmap creation  |
| notifications          | Notification delivery      |
| analytics-aggregation  | Dashboard metric refresh   |
| weekly-reports         | Weekly progress reports    |

## Security

- Helmet, CORS, rate limiting
- bcrypt password hashing
- JWT access + refresh tokens with revocation
- RBAC middleware on protected routes
- Zod request validation
- HTML input sanitization
- Prisma parameterized queries (SQL injection protection)

See [docs/API_EXAMPLES.md](./docs/API_EXAMPLES.md) for curl examples.
