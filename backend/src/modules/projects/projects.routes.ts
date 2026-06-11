import { Router } from 'express';
import { projectsController } from './projects.controller';
import { asyncHandler } from '../../utils/asyncHandler';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();

router.get('/', asyncHandler((req, res) => projectsController.list(req, res)));
router.get('/recommended', authenticate, asyncHandler((req, res) => projectsController.recommended(req, res)));

export default router;
