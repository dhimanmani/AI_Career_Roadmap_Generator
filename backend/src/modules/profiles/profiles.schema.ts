import { z } from 'zod';

export const createProfileSchema = z.object({
  education: z.string().min(2).optional(),
  university: z.string().min(2).optional(),
  degree: z.string().min(2).optional(),
  cgpa: z.number().min(0).max(10).optional(),
  graduationYear: z.number().int().min(2000).max(2100).optional(),
  experience: z.array(z.object({
    role: z.string(),
    company: z.string(),
    duration: z.string(),
  })).optional(),
  certifications: z.array(z.string()).optional(),
  interests: z.array(z.string()).optional(),
  learningStyle: z.enum(['Visual', 'Hands-on', 'Theoretical', 'Self-paced']).optional(),
});

export const updateProfileSchema = createProfileSchema.partial();

export const profileIdSchema = z.object({
  id: z.string().uuid(),
});
