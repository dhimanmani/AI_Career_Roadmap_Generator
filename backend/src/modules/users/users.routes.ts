import { Router } from 'express';
import { usersController } from './users.controller';
import { asyncHandler } from '../../utils/asyncHandler';
import { authenticate } from '../../middleware/auth.middleware';
import { validate } from '../../middleware/validate.middleware';
import { updateUserSchema } from './users.schema';

const router = Router();

router.use(authenticate);

router.get('/me', asyncHandler((req, res) => usersController.getMe(req, res)));
router.patch('/me', validate(updateUserSchema), asyncHandler((req, res) => usersController.updateMe(req, res)));
router.delete('/me', asyncHandler((req, res) => usersController.deleteMe(req, res)));

export default router;
