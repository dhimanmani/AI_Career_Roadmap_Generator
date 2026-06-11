import { Request, Response } from 'express';
import { roadmapsService } from './roadmaps.service';
import { sendSuccess } from '../../utils/apiResponse';
import { UnauthorizedError } from '../../common/errors/AppError';
import { getParamId } from '../../utils/params';

export class RoadmapsController {
  async generate(req: Request, res: Response): Promise<void> {
    if (!req.user) throw new UnauthorizedError();
    const roadmap = await roadmapsService.generate(req.user.id, req.body);
    sendSuccess(res, roadmap, 'Roadmap generation started', 201);
  }

  async getById(req: Request, res: Response): Promise<void> {
    if (!req.user) throw new UnauthorizedError();
    const roadmap = await roadmapsService.getById(getParamId(req.params.id), req.user.id, req.user.role);
    sendSuccess(res, roadmap);
  }

  async updateMilestone(req: Request, res: Response): Promise<void> {
    if (!req.user) throw new UnauthorizedError();
    const milestone = await roadmapsService.updateMilestone(getParamId(req.params.id), req.user.id, req.body);
    sendSuccess(res, milestone, 'Milestone updated');
  }
}

export const roadmapsController = new RoadmapsController();
