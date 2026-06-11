import { Router } from 'express';
import { progressController } from './progress.controller';
import { asyncHandler } from '../../utils/asyncHandler';
import { authenticate } from '../../middleware/auth.middleware';
import { validate } from '../../middleware/validate.middleware';
import { requirePermissions } from '../../middleware/rbac.middleware';
import { PERMISSIONS } from '../../common/permissions';
import { createProgressSchema } from './progress.schema';

const router = Router();

router.use(authenticate, requirePermissions(PERMISSIONS.PROGRESS_TRACK));

router.post('/', validate(createProgressSchema), asyncHandler((req, res) => progressController.create(req, res)));
router.get('/', asyncHandler((req, res) => progressController.list(req, res)));
router.get('/summary', asyncHandler((req, res) => progressController.summary(req, res)));

export default router;
