import request from 'supertest';
import { createApp } from '../src/app';
import { prisma } from '../src/database/prisma';
import { isDatabaseAvailable } from './helpers/db';

const app = createApp();

describe('Authentication API (integration)', () => {
  let dbAvailable = false;

  const testUser = {
    name: 'Test Student',
    email: `test-${Date.now()}@acrg.test`,
    password: 'TestPass123',
  };

  let accessToken = '';
  let refreshToken = '';

  beforeAll(async () => {
    dbAvailable = await isDatabaseAvailable();
    if (!dbAvailable) {
      console.warn('Database unavailable — skipping auth integration tests');
    }
  });

  afterAll(async () => {
    if (dbAvailable) {
      await prisma.user.deleteMany({ where: { email: testUser.email } }).catch(() => undefined);
    }
    await prisma.$disconnect();
  });

  function itWithDb(name: string, fn: () => Promise<void>) {
    it(name, async () => {
      if (!dbAvailable) return;
      await fn();
    });
  }

  itWithDb('POST /auth/register - registers a new student', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send(testUser);

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.user.email).toBe(testUser.email);
    expect(res.body.data.accessToken).toBeDefined();
    accessToken = res.body.data.accessToken;
    refreshToken = res.body.data.refreshToken;
  });

  itWithDb('POST /auth/register - rejects duplicate email', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send(testUser);

    expect(res.status).toBe(409);
  });

  itWithDb('POST /auth/login - authenticates user', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: testUser.email, password: testUser.password });

    expect(res.status).toBe(200);
    expect(res.body.data.accessToken).toBeDefined();
    accessToken = res.body.data.accessToken;
    refreshToken = res.body.data.refreshToken;
  });

  itWithDb('GET /users/me - returns authenticated user', async () => {
    const res = await request(app)
      .get('/api/v1/users/me')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(res.status).toBe(200);
    expect(res.body.data.email).toBe(testUser.email);
  });

  itWithDb('POST /auth/refresh-token - refreshes tokens', async () => {
    const res = await request(app)
      .post('/api/v1/auth/refresh-token')
      .send({ refreshToken });

    expect(res.status).toBe(200);
    expect(res.body.data.accessToken).toBeDefined();
  });

  it('GET /users/me - rejects without token', async () => {
    const res = await request(app).get('/api/v1/users/me');
    expect(res.status).toBe(401);
  });
});
