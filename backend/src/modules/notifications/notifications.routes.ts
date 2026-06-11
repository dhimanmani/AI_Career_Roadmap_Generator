import { Router } from 'express';
import { notificationsController } from './notifications.controller';
import { asyncHandler } from '../../utils/asyncHandler';
import { authenticate } from '../../middleware/auth.middleware';
import { validate } from '../../middleware/validate.middleware';
import { notificationIdSchema } from './notifications.schema';

const router = Router();

router.use(authenticate);

router.get('/', asyncHandler((req, res) => notificationsController.list(req, res)));
router.patch('/:id/read', validate(notificationIdSchema, 'params'), asyncHandler((req, res) => notificationsController.markRead(req, res)));

export default router;
