import { Request, Response } from 'express';
import { usersService } from './users.service';
import { sendSuccess } from '../../utils/apiResponse';
import { UnauthorizedError } from '../../common/errors/AppError';

export class UsersController {
  private getUserId(req: Request): string {
    if (!req.user) throw new UnauthorizedError();
    return req.user.id;
  }

  async getMe(req: Request, res: Response): Promise<void> {
    const user = await usersService.getMe(this.getUserId(req));
    sendSuccess(res, user);
  }

  async updateMe(req: Request, res: Response): Promise<void> {
    const user = await usersService.updateMe(this.getUserId(req), req.body);
    sendSuccess(res, user, 'Profile updated');
  }

  async deleteMe(req: Request, res: Response): Promise<void> {
    const result = await usersService.deleteMe(this.getUserId(req));
    sendSuccess(res, result);
  }
}

export const usersController = new UsersController();
