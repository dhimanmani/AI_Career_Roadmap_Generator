import { Request, Response } from 'express';
import { mentorsService } from './mentors.service';
import { sendSuccess } from '../../utils/apiResponse';
import { UnauthorizedError } from '../../common/errors/AppError';
import { getParamId } from '../../utils/params';

export class MentorsController {
  async create(req: Request, res: Response): Promise<void> {
    if (!req.user) throw new UnauthorizedError();
    const review = await mentorsService.create(req.user.id, req.body);
    sendSuccess(res, review, 'Review submitted', 201);
  }

  async list(req: Request, res: Response): Promise<void> {
    if (!req.user) throw new UnauthorizedError();
    const reviews = await mentorsService.list(req.user.id, req.user.role);
    sendSuccess(res, reviews);
  }

  async update(req: Request, res: Response): Promise<void> {
    if (!req.user) throw new UnauthorizedError();
    const review = await mentorsService.update(getParamId(req.params.id), req.user.id, req.user.role, req.body);
    sendSuccess(res, review, 'Review updated');
  }
}

export const mentorsController = new MentorsController();
