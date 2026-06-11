import OpenAI from 'openai';
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
  private client: OpenAI | null = null;
  private metrics: AiCostMetrics = { totalTokens: 0, estimatedCostUsd: 0, calls: 0 };

  private getClient(): OpenAI {
    if (!this.client) {
      if (!env.OPENAI_API_KEY) {
        throw new AppError(503, 'AI service not configured', 'AI_UNAVAILABLE');
      }
      this.client = new OpenAI({
        apiKey: env.OPENAI_API_KEY,
        timeout: env.OPENAI_TIMEOUT_MS,
        maxRetries: env.OPENAI_MAX_RETRIES,
      });
    }
    return this.client;
  }

  getMetrics(): AiCostMetrics {
    return { ...this.metrics };
  }

  private async callJson<T>(prompt: string, schema: z.ZodSchema<T>): Promise<T> {
    const client = this.getClient();

    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= env.OPENAI_MAX_RETRIES; attempt++) {
      try {
        const response = await client.chat.completions.create({
          model: env.OPENAI_MODEL,
          messages: [
            { role: 'system', content: 'You are a career planning AI. Always respond with valid JSON only.' },
            { role: 'user', content: prompt },
          ],
          response_format: { type: 'json_object' },
          temperature: 0.4,
        });

        const content = response.choices[0]?.message?.content;
        if (!content) throw new Error('Empty AI response');

        const usage = response.usage;
        if (usage) {
          this.metrics.totalTokens += usage.total_tokens;
          this.metrics.estimatedCostUsd += (usage.total_tokens / 1000) * 0.002;
          this.metrics.calls += 1;
        }

        const parsed = JSON.parse(content);
        return schema.parse(parsed);
      } catch (error) {
        lastError = error as Error;
        logger.warn(`AI call attempt ${attempt} failed: ${lastError.message}`);
        if (attempt < env.OPENAI_MAX_RETRIES) {
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
