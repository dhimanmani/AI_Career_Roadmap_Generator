import { Request, Response } from 'express';
import { careerGoalsService } from './career-goals.service';
import { sendSuccess } from '../../utils/apiResponse';
import { UnauthorizedError } from '../../common/errors/AppError';
import { getParamId } from '../../utils/params';

export class CareerGoalsController {
  async create(req: Request, res: Response): Promise<void> {
    if (!req.user) throw new UnauthorizedError();
    const goal = await careerGoalsService.create(req.user.id, req.body);
    sendSuccess(res, goal, 'Career goal created', 201);
  }

  async list(req: Request, res: Response): Promise<void> {
    if (!req.user) throw new UnauthorizedError();
    const goals = await careerGoalsService.list(req.user.id);
    sendSuccess(res, goals);
  }

  async update(req: Request, res: Response): Promise<void> {
    if (!req.user) throw new UnauthorizedError();
    const goal = await careerGoalsService.update(getParamId(req.params.id), req.user.id, req.body);
    sendSuccess(res, goal, 'Career goal updated');
  }
}

export const careerGoalsController = new CareerGoalsController();
