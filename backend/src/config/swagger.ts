import swaggerJsdoc from 'swagger-jsdoc';
import { env } from './env';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'AI Career Roadmap Generator API',
      version: '1.0.0',
      description: 'Production API for ACRG - AI-powered career planning platform',
      contact: { name: 'ACRG Team', email: 'support@acrg.app' },
    },
    servers: [
      { url: `http://localhost:${env.PORT}${env.API_PREFIX}`, description: 'Development' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      },
      schemas: {
        Error: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string' },
            code: { type: 'string' },
          },
        },
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            email: { type: 'string' },
            role: { type: 'string', enum: ['STUDENT', 'MENTOR', 'PLACEMENT_OFFICER', 'ADMIN'] },
            isVerified: { type: 'boolean' },
          },
        },
        GapAnalysisResult: {
          type: 'object',
          properties: {
            readinessScore: { type: 'integer', example: 72 },
            strengths: { type: 'array', items: { type: 'object' } },
            weaknesses: { type: 'array', items: { type: 'object' } },
            missingSkills: { type: 'array', items: { type: 'object' } },
            recommendations: { type: 'array', items: { type: 'object' } },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
    tags: [
      { name: 'Auth', description: 'Authentication endpoints' },
      { name: 'Users', description: 'User management' },
      { name: 'Profiles', description: 'Career profiles' },
      { name: 'Career Goals', description: 'Career goal selection' },
      { name: 'Skills', description: 'Skill inventory' },
      { name: 'Gap Analysis', description: 'Skill gap analysis engine' },
      { name: 'Roadmaps', description: 'AI-powered roadmaps' },
      { name: 'Progress', description: 'Progress tracking' },
      { name: 'Mentors', description: 'Mentor reviews' },
      { name: 'Notifications', description: 'User notifications' },
      { name: 'Analytics', description: 'Platform analytics' },
      { name: 'Admin', description: 'Administration' },
      { name: 'Projects', description: 'Project recommendations' },
    ],
  },
  apis: ['./src/**/*.routes.ts', './src/auth/*.routes.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
