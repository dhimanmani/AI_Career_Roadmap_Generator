import { Router } from 'express';
import { analyticsController } from './analytics.controller';
import { asyncHandler } from '../../utils/asyncHandler';
import { authenticate } from '../../middleware/auth.middleware';
import { requirePermissions } from '../../middleware/rbac.middleware';
import { PERMISSIONS } from '../../common/permissions';

const router = Router();

router.use(authenticate);

router.get(
  '/dashboard',
  requirePermissions(PERMISSIONS.ANALYTICS_VIEW, PERMISSIONS.ADMIN_FULL),
  asyncHandler((req, res) => analyticsController.dashboard(req, res))
);

router.get(
  '/reports',
  requirePermissions(PERMISSIONS.REPORTS_VIEW, PERMISSIONS.ANALYTICS_VIEW, PERMISSIONS.ADMIN_FULL),
  asyncHandler((req, res) => analyticsController.reports(req, res))
);

export default router;
