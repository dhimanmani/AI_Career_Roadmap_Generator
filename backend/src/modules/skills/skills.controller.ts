import { Request, Response } from 'express';
import { SkillCategory } from '@prisma/client';
import { skillsService } from './skills.service';
import { sendSuccess } from '../../utils/apiResponse';
import { UnauthorizedError } from '../../common/errors/AppError';

export class SkillsController {
  async createSkill(req: Request, res: Response): Promise<void> {
    const skill = await skillsService.createSkill(req.body);
    sendSuccess(res, skill, 'Skill created', 201);
  }

  async listSkills(req: Request, res: Response): Promise<void> {
    const skills = await skillsService.listSkills({
      category: req.query.category as SkillCategory | undefined,
      search: req.query.search as string | undefined,
    });
    sendSuccess(res, skills);
  }

  async upsertUserSkill(req: Request, res: Response): Promise<void> {
    if (!req.user) throw new UnauthorizedError();
    const userSkill = await skillsService.upsertUserSkill(req.user.id, req.body);
    sendSuccess(res, userSkill, 'User skill saved', 201);
  }

  async listUserSkills(req: Request, res: Response): Promise<void> {
    if (!req.user) throw new UnauthorizedError();
    const skills = await skillsService.listUserSkills(req.user.id);
    sendSuccess(res, skills);
  }
}

export const skillsController = new SkillsController();
