import { Request, Response } from 'express';
import { progressService } from './progress.service';
import { sendSuccess } from '../../utils/apiResponse';
import { UnauthorizedError } from '../../common/errors/AppError';

export class ProgressController {
  async create(req: Request, res: Response): Promise<void> {
    if (!req.user) throw new UnauthorizedError();
    const update = await progressService.create(req.user.id, req.body);
    sendSuccess(res, update, 'Progress recorded', 201);
  }

  async list(req: Request, res: Response): Promise<void> {
    if (!req.user) throw new UnauthorizedError();
    const updates = await progressService.list(req.user.id);
    sendSuccess(res, updates);
  }

  async summary(req: Request, res: Response): Promise<void> {
    if (!req.user) throw new UnauthorizedError();
    const summary = await progressService.summary(req.user.id);
    sendSuccess(res, summary);
  }
}

export const progressController = new ProgressController();
