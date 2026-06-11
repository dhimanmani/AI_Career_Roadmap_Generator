import { Router } from 'express';
import { roadmapsController } from './roadmaps.controller';
import { asyncHandler } from '../../utils/asyncHandler';
import { authenticate } from '../../middleware/auth.middleware';
import { validate } from '../../middleware/validate.middleware';
import { requirePermissions } from '../../middleware/rbac.middleware';
import { PERMISSIONS } from '../../common/permissions';
import { generateRoadmapSchema, roadmapIdSchema, milestoneIdSchema, updateMilestoneSchema } from './roadmaps.schema';

const router = Router();

router.use(authenticate);

router.post(
  '/generate',
  requirePermissions(PERMISSIONS.ROADMAP_GENERATE),
  validate(generateRoadmapSchema),
  asyncHandler((req, res) => roadmapsController.generate(req, res))
);

router.get(
  '/:id',
  requirePermissions(PERMISSIONS.ROADMAP_VIEW),
  validate(roadmapIdSchema, 'params'),
  asyncHandler((req, res) => roadmapsController.getById(req, res))
);

export default router;

export const milestonesRouter = Router();

milestonesRouter.patch(
  '/:id',
  authenticate,
  requirePermissions(PERMISSIONS.ROADMAP_VIEW),
  validate(milestoneIdSchema, 'params'),
  validate(updateMilestoneSchema),
  asyncHandler((req, res) => roadmapsController.updateMilestone(req, res))
);
