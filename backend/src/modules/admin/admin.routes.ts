import { Router } from 'express';
import { adminController } from './admin.controller';
import { asyncHandler } from '../../utils/asyncHandler';
import { authenticate } from '../../middleware/auth.middleware';
import { requirePermissions } from '../../middleware/rbac.middleware';
import { validate } from '../../middleware/validate.middleware';
import { PERMISSIONS } from '../../common/permissions';
import {
  updateUserAdminSchema,
  createCareerPathSchema,
  createAdminSkillSchema,
  userIdParamSchema,
} from './admin.schema';

const router = Router();

router.use(authenticate, requirePermissions(PERMISSIONS.ADMIN_FULL));

router.get('/users', asyncHandler((req, res) => adminController.listUsers(req, res)));
router.patch('/users/:id', validate(userIdParamSchema, 'params'), validate(updateUserAdminSchema), asyncHandler((req, res) => adminController.updateUser(req, res)));
router.delete('/users/:id', validate(userIdParamSchema, 'params'), asyncHandler((req, res) => adminController.deleteUser(req, res)));

router.get('/skills', asyncHandler((req, res) => adminController.listSkills(req, res)));
router.post('/skills', validate(createAdminSkillSchema), asyncHandler((req, res) => adminController.createSkill(req, res)));

router.get('/career-paths', asyncHandler((req, res) => adminController.listCareerPaths(req, res)));
router.post('/career-paths', validate(createCareerPathSchema), asyncHandler((req, res) => adminController.createCareerPath(req, res)));

router.get('/analytics', asyncHandler((req, res) => adminController.systemAnalytics(req, res)));

export default router;
