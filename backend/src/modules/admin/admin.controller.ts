import { Request, Response } from 'express';
import { adminService } from './admin.service';
import { sendSuccess, sendPaginated } from '../../utils/apiResponse';
import { getParamId } from '../../utils/params';

export class AdminController {
  async listUsers(req: Request, res: Response): Promise<void> {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const result = await adminService.listUsers(page, limit);
    sendPaginated(res, result.users, result.total, result.page, result.limit);
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    const user = await adminService.updateUser(getParamId(req.params.id), req.body);
    sendSuccess(res, user, 'User updated');
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    const result = await adminService.deleteUser(getParamId(req.params.id));
    sendSuccess(res, result);
  }

  async listSkills(_req: Request, res: Response): Promise<void> {
    const skills = await adminService.listSkills();
    sendSuccess(res, skills);
  }

  async createSkill(req: Request, res: Response): Promise<void> {
    const skill = await adminService.createSkill(req.body);
    sendSuccess(res, skill, 'Skill created', 201);
  }

  async listCareerPaths(_req: Request, res: Response): Promise<void> {
    const paths = await adminService.listCareerPaths();
    sendSuccess(res, paths);
  }

  async createCareerPath(req: Request, res: Response): Promise<void> {
    const path = await adminService.createCareerPath(req.body);
    sendSuccess(res, path, 'Career path created', 201);
  }

  async systemAnalytics(_req: Request, res: Response): Promise<void> {
    const analytics = await adminService.systemAnalytics();
    sendSuccess(res, analytics);
  }
}

export const adminController = new AdminController();
