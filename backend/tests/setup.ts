process.env.NODE_ENV = 'test';
process.env.PORT = '4001';
process.env.API_PREFIX = '/api/v1';
process.env.DATABASE_URL = process.env.DATABASE_URL ?? 'postgresql://acrg:acrg_secret@localhost:5432/acrg_test?schema=public';
process.env.REDIS_URL = process.env.REDIS_URL ?? 'redis://localhost:6379';
process.env.JWT_ACCESS_SECRET = 'test-access-secret-minimum-32-characters';
process.env.JWT_REFRESH_SECRET = 'test-refresh-secret-minimum-32-characters';
process.env.CORS_ORIGIN = 'http://localhost:5173';
