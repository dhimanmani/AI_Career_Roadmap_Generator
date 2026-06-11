import { Request, Response } from 'express';
import { gapAnalysisService } from './gap-analysis.service';
import { sendSuccess } from '../../utils/apiResponse';
import { UnauthorizedError } from '../../common/errors/AppError';

export class GapAnalysisController {
  async analyze(req: Request, res: Response): Promise<void> {
    if (!req.user) throw new UnauthorizedError();
    const result = await gapAnalysisService.analyze(req.user.id, req.body.careerGoal);
    sendSuccess(res, result);
  }
}

export const gapAnalysisController = new GapAnalysisController();
