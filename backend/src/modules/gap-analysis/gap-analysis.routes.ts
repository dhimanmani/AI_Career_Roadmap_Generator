import { Router } from 'express';
import { gapAnalysisController } from './gap-analysis.controller';
import { asyncHandler } from '../../utils/asyncHandler';
import { authenticate } from '../../middleware/auth.middleware';
import { validate } from '../../middleware/validate.middleware';
import { gapAnalysisSchema } from './gap-analysis.schema';

const router = Router();

router.post(
  '/',
  authenticate,
  validate(gapAnalysisSchema),
  asyncHandler((req, res) => gapAnalysisController.analyze(req, res))
);

export default router;
