import { Router } from 'express';
import { profilesController } from './profiles.controller';
import { asyncHandler } from '../../utils/asyncHandler';
import { authenticate } from '../../middleware/auth.middleware';
import { validate } from '../../middleware/validate.middleware';
import { requirePermissions } from '../../middleware/rbac.middleware';
import { PERMISSIONS } from '../../common/permissions';
import { createProfileSchema, updateProfileSchema, profileIdSchema } from './profiles.schema';

const router = Router();

router.use(authenticate, requirePermissions(PERMISSIONS.PROFILE_MANAGE));

router.post('/', validate(createProfileSchema), asyncHandler((req, res) => profilesController.create(req, res)));
router.get('/:id', validate(profileIdSchema, 'params'), asyncHandler((req, res) => profilesController.getById(req, res)));
router.patch('/:id', validate(profileIdSchema, 'params'), validate(updateProfileSchema), asyncHandler((req, res) => profilesController.update(req, res)));
router.delete('/:id', validate(profileIdSchema, 'params'), asyncHandler((req, res) => profilesController.delete(req, res)));

export default router;
