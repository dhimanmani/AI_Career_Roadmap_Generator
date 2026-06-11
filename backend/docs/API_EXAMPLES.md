# ACRG API Examples

Base URL: `http://localhost:4000/api/v1`

Swagger UI: `http://localhost:4000/api-docs`

## Authentication

### Register
```bash
curl -X POST http://localhost:4000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alex Rivera",
    "email": "alex@university.edu",
    "password": "SecurePass1"
  }'
```

### Login
```bash
curl -X POST http://localhost:4000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@acrg.app",
    "password": "Student123!"
  }'
```

### Refresh Token
```bash
curl -X POST http://localhost:4000/api/v1/auth/refresh-token \
  -H "Content-Type: application/json" \
  -d '{ "refreshToken": "<REFRESH_TOKEN>" }'
```

## Career Profile

```bash
curl -X POST http://localhost:4000/api/v1/profiles \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "education": "B.Tech Computer Science",
    "university": "MIT",
    "degree": "Bachelor",
    "cgpa": 8.5,
    "graduationYear": 2027,
    "interests": ["web-dev", "ai"],
    "learningStyle": "Hands-on"
  }'
```

## Career Goal

```bash
curl -X POST http://localhost:4000/api/v1/career-goals \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "careerGoal": "FULL_STACK_DEVELOPER",
    "targetTimeline": "6 months"
  }'
```

## User Skills

```bash
curl -X POST http://localhost:4000/api/v1/user-skills \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "skillId": "<SKILL_UUID>",
    "level": "INTERMEDIATE",
    "score": 75
  }'
```

## Gap Analysis

```bash
curl -X POST http://localhost:4000/api/v1/gap-analysis \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{ "careerGoal": "FULL_STACK_DEVELOPER" }'
```

## Generate Roadmap

```bash
curl -X POST http://localhost:4000/api/v1/roadmaps/generate \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{ "useAi": true }'
```

## Progress Tracking

```bash
curl -X POST http://localhost:4000/api/v1/progress \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "milestoneId": "<MILESTONE_UUID>",
    "completionPercentage": 50,
    "notes": "Completed module 1"
  }'
```

## Mentor Review

```bash
curl -X POST http://localhost:4000/api/v1/mentor-reviews \
  -H "Authorization: Bearer <MENTOR_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "studentId": "<STUDENT_UUID>",
    "roadmapId": "<ROADMAP_UUID>",
    "comments": "Strong foundation, add testing module.",
    "rating": 4,
    "suggestions": ["Add Jest testing", "Include Redis caching"]
  }'
```

## Admin - List Users

```bash
curl http://localhost:4000/api/v1/admin/users \
  -H "Authorization: Bearer <ADMIN_TOKEN>"
```

## Seeded Test Accounts

| Role    | Email             | Password     |
|---------|-------------------|--------------|
| Admin   | admin@acrg.app    | Admin123!    |
| Mentor  | mentor@acrg.app   | Mentor123!   |
| Student | student@acrg.app  | Student123!  |
