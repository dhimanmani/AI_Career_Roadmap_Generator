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
- **Deploy:** Docker

## Quick Start

### 1. Start infrastructure

```bash
cd docker
docker compose up -d postgres redis
```

### 2. Configure environment

```bash
cp .env.example .env
# Edit .env with your secrets
```

### 3. Install & migrate

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

## Docker (full stack)

```bash
cd docker
docker compose up --build
```

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
