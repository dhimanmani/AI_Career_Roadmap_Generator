import { GoogleGenAI } from '@google/genai';
import { z } from 'zod';
import { env } from '../config/env';
import { logger } from '../config/logger';
import { AppError } from '../common/errors/AppError';
import { PROMPTS } from './prompts';
import {
  aiRoadmapSchema,
  aiProjectSchema,
  aiWeeklyPlanSchema,
  aiResourceSchema,
  AiRoadmapOutput,
} from './ai.schemas';

interface AiCostMetrics {
  totalTokens: number;
  estimatedCostUsd: number;
  calls: number;
}

export class AiService {
  private client: GoogleGenAI | null = null;
  private metrics: AiCostMetrics = { totalTokens: 0, estimatedCostUsd: 0, calls: 0 };

  private getClient(): GoogleGenAI {
    if (!this.client) {
      if (!env.GEMINI_API_KEY) {
        throw new AppError(503, 'AI service not configured', 'AI_UNAVAILABLE');
      }
      this.client = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });
    }
    return this.client;
  }

  getMetrics(): AiCostMetrics {
    return { ...this.metrics };
  }

  private async callJson<T>(prompt: string, schema: z.ZodSchema<T>): Promise<T> {
    const client = this.getClient();

    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= env.GEMINI_MAX_RETRIES; attempt++) {
      try {
        const result = await client.models.generateContent({
          model: env.GEMINI_MODEL,
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text:
                    'You are a career planning AI. Always respond with valid JSON only.\n\n' +
                    prompt,
                },
              ],
            },
          ],
          config: {
            responseMimeType: 'application/json',
            temperature: 0.4,
          },
        });

        const content = result.text;
        if (!content) throw new Error('Empty AI response');

        const usage = result.usageMetadata;
        if (usage) {
          const totalTokens = usage.totalTokenCount ?? 0;
          this.metrics.totalTokens += totalTokens;
          // Gemini Flash pricing: ~$0.000 for small volumes; keep consistent metric shape
          this.metrics.estimatedCostUsd += (totalTokens / 1_000_000) * 0.15;
          this.metrics.calls += 1;
        }

        const parsed = JSON.parse(content);
        return schema.parse(parsed);
      } catch (error) {
        lastError = error as Error;
        logger.warn(`AI call attempt ${attempt} failed: ${lastError.message}`);
        if (attempt < env.GEMINI_MAX_RETRIES) {
          await new Promise((r) => setTimeout(r, 1000 * attempt));
        }
      }
    }

    throw new AppError(502, 'AI service failed after retries', 'AI_ERROR', lastError?.message);
  }

  async generateRoadmap(careerGoal: string, skills: string[], timeline?: string): Promise<AiRoadmapOutput> {
    return this.callJson(PROMPTS.generateRoadmap(careerGoal, skills, timeline), aiRoadmapSchema);
  }

  async recommendProjects(careerGoal: string, gaps: string[]) {
    return this.callJson(PROMPTS.recommendProjects(careerGoal, gaps), aiProjectSchema);
  }

  async generateWeeklyPlan(milestone: string, hoursPerWeek = 10) {
    return this.callJson(PROMPTS.weeklyStudyPlan(milestone, hoursPerWeek), aiWeeklyPlanSchema);
  }

  async suggestResources(skill: string) {
    return this.callJson(PROMPTS.suggestResources(skill), aiResourceSchema);
  }

  async reviseRoadmap(currentMilestones: string, feedback: string): Promise<AiRoadmapOutput> {
    return this.callJson(PROMPTS.reviseRoadmap(currentMilestones, feedback), aiRoadmapSchema);
  }
}

export const aiService = new AiService();
