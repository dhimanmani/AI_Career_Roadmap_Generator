import { Request, Response } from 'express';
import { analyticsService } from './analytics.service';
import { sendSuccess } from '../../utils/apiResponse';

export class AnalyticsController {
  async dashboard(_req: Request, res: Response): Promise<void> {
    const data = await analyticsService.getDashboard();
    sendSuccess(res, data);
  }

  async reports(req: Request, res: Response): Promise<void> {
    const userId = req.user?.role === 'STUDENT' ? req.user.id : undefined;
    const data = await analyticsService.getReports(userId);
    sendSuccess(res, data);
  }
}

export const analyticsController = new AnalyticsController();
