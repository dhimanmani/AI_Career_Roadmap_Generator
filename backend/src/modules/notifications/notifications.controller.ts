import { Request, Response } from 'express';
import { notificationsService } from './notifications.service';
import { sendSuccess } from '../../utils/apiResponse';
import { UnauthorizedError } from '../../common/errors/AppError';
import { getParamId } from '../../utils/params';

export class NotificationsController {
  async list(req: Request, res: Response): Promise<void> {
    if (!req.user) throw new UnauthorizedError();
    const notifications = await notificationsService.list(req.user.id);
    sendSuccess(res, notifications);
  }

  async markRead(req: Request, res: Response): Promise<void> {
    if (!req.user) throw new UnauthorizedError();
    const notification = await notificationsService.markRead(getParamId(req.params.id), req.user.id);
    sendSuccess(res, notification, 'Notification marked as read');
  }
}

export const notificationsController = new NotificationsController();
