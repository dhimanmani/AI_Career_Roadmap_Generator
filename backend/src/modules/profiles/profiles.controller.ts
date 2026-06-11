import { Request, Response } from 'express';
import { profilesService } from './profiles.service';
import { sendSuccess } from '../../utils/apiResponse';
import { UnauthorizedError } from '../../common/errors/AppError';
import { getParamId } from '../../utils/params';

export class ProfilesController {
  async create(req: Request, res: Response): Promise<void> {
    if (!req.user) throw new UnauthorizedError();
    const profile = await profilesService.create(req.user.id, req.body);
    sendSuccess(res, profile, 'Profile created', 201);
  }

  async getById(req: Request, res: Response): Promise<void> {
    if (!req.user) throw new UnauthorizedError();
    const profile = await profilesService.getById(getParamId(req.params.id), req.user.id, req.user.role);
    sendSuccess(res, profile);
  }

  async update(req: Request, res: Response): Promise<void> {
    if (!req.user) throw new UnauthorizedError();
    const profile = await profilesService.update(getParamId(req.params.id), req.user.id, req.body);
    sendSuccess(res, profile, 'Profile updated');
  }

  async delete(req: Request, res: Response): Promise<void> {
    if (!req.user) throw new UnauthorizedError();
    const result = await profilesService.delete(getParamId(req.params.id), req.user.id);
    sendSuccess(res, result);
  }
}

export const profilesController = new ProfilesController();
