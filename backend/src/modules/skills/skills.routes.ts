import { Router } from 'express';
import { skillsController } from './skills.controller';
import { asyncHandler } from '../../utils/asyncHandler';
import { authenticate } from '../../middleware/auth.middleware';
import { validate } from '../../middleware/validate.middleware';
import { requirePermissions } from '../../middleware/rbac.middleware';
import { PERMISSIONS } from '../../common/permissions';
import { createSkillSchema, createUserSkillSchema } from './skills.schema';

const router = Router();

router.get('/skills', authenticate, asyncHandler((req, res) => skillsController.listSkills(req, res)));

router.post(
  '/skills',
  authenticate,
  requirePermissions(PERMISSIONS.ADMIN_SKILLS),
  validate(createSkillSchema),
  asyncHandler((req, res) => skillsController.createSkill(req, res))
);

router.get('/user-skills', authenticate, asyncHandler((req, res) => skillsController.listUserSkills(req, res)));

router.post(
  '/user-skills',
  authenticate,
  requirePermissions(PERMISSIONS.PROFILE_MANAGE),
  validate(createUserSkillSchema),
  asyncHandler((req, res) => skillsController.upsertUserSkill(req, res))
);

export default router;
