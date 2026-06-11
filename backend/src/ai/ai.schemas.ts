import { z } from 'zod';

export const aiMilestoneSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  phase: z.number().int().min(1).max(5),
  difficulty: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']),
  estimatedHours: z.number().int().min(1).max(500),
  resources: z.array(z.object({
    title: z.string(),
    url: z.string().url().or(z.literal('#')),
    type: z.enum(['Video', 'Article', 'Course']),
  })).optional(),
});

export const aiRoadmapSchema = z.object({
  milestones: z.array(aiMilestoneSchema).min(3).max(20),
  summary: z.string().optional(),
});

export const aiProjectSchema = z.object({
  projects: z.array(z.object({
    title: z.string(),
    description: z.string(),
    difficulty: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']),
    skillsCovered: z.array(z.string()),
    estimatedDuration: z.string(),
  })).max(10),
});

export const aiWeeklyPlanSchema = z.object({
  week: z.number().int().min(1),
  focus: z.string(),
  tasks: z.array(z.object({
    day: z.string(),
    topic: z.string(),
    hours: z.number(),
    activity: z.string(),
  })),
});

export const aiResourceSchema = z.object({
  resources: z.array(z.object({
    skill: z.string(),
    title: z.string(),
    url: z.string(),
    type: z.string(),
  })),
});

export type AiRoadmapOutput = z.infer<typeof aiRoadmapSchema>;
