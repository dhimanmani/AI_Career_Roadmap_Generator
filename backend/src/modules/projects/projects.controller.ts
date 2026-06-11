import { Request, Response } from 'express';
import { projectsService } from './projects.service';
import { sendSuccess } from '../../utils/apiResponse';
import { UnauthorizedError } from '../../common/errors/AppError';
import { CareerTrack } from '@prisma/client';

export class ProjectsController {
  async list(_req: Request, res: Response): Promise<void> {
    const projects = await projectsService.list();
    sendSuccess(res, projects);
  }

  async recommended(req: Request, res: Response): Promise<void> {
    if (!req.user) throw new UnauthorizedError();
    const careerGoal = req.query.careerGoal as CareerTrack | undefined;
    const projects = await projectsService.getRecommended(req.user.id, careerGoal);
    sendSuccess(res, projects);
  }
}

export const projectsController = new ProjectsController();
