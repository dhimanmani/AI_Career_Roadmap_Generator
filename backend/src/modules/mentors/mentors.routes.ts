import { Router } from 'express';
import { mentorsController } from './mentors.controller';
import { asyncHandler } from '../../utils/asyncHandler';
import { authenticate } from '../../middleware/auth.middleware';
import { validate } from '../../middleware/validate.middleware';
import { requirePermissions } from '../../middleware/rbac.middleware';
import { PERMISSIONS } from '../../common/permissions';
import { createMentorReviewSchema, updateMentorReviewSchema, mentorReviewIdSchema } from './mentors.schema';

const router = Router();

router.use(authenticate);

router.post(
  '/',
  requirePermissions(PERMISSIONS.MENTOR_REVIEW),
  validate(createMentorReviewSchema),
  asyncHandler((req, res) => mentorsController.create(req, res))
);

router.get(
  '/',
  requirePermissions(PERMISSIONS.MENTOR_REVIEW, PERMISSIONS.ROADMAP_VIEW),
  asyncHandler((req, res) => mentorsController.list(req, res))
);

router.patch(
  '/:id',
  requirePermissions(PERMISSIONS.MENTOR_APPROVE),
  validate(mentorReviewIdSchema, 'params'),
  validate(updateMentorReviewSchema),
  asyncHandler((req, res) => mentorsController.update(req, res))
);

export default router;
