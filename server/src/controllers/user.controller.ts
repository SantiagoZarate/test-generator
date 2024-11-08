import { Response } from 'express';
import { userService } from '../services/user.service';
import { AuthRequest } from '../types/authRequest';

class UserController {
  async getUserProfile(req: AuthRequest, res: Response) {
    const data = userService.getUserProfile({ id: req.user!.id });
    res.json({
      data,
      message: 'Retrieving user profile information',
    });
  }
}

export const userController = new UserController();
