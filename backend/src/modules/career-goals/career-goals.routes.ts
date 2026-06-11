import { Router } from 'express';
import { careerGoalsController } from './career-goals.controller';
import { asyncHandler } from '../../utils/asyncHandler';
import { authenticate } from '../../middleware/auth.middleware';
import { validate } from '../../middleware/validate.middleware';
import { requirePermissions } from '../../middleware/rbac.middleware';
import { PERMISSIONS } from '../../common/permissions';
import { createCareerGoalSchema, updateCareerGoalSchema, careerGoalIdSchema } from './career-goals.schema';

const router = Router();

router.use(authenticate, requirePermissions(PERMISSIONS.GOAL_SELECT));

router.post('/', validate(createCareerGoalSchema), asyncHandler((req, res) => careerGoalsController.create(req, res)));
router.get('/', asyncHandler((req, res) => careerGoalsController.list(req, res)));
router.patch('/:id', validate(careerGoalIdSchema, 'params'), validate(updateCareerGoalSchema), asyncHandler((req, res) => careerGoalsController.update(req, res)));

export default router;
