import { Request, Response } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { envs } from '../../config/envs';
import { userService } from '../services/user.service';
import { AuthRequest } from '../types/authRequest';

const cookieName = 'sessionToken';

class AuthController {
  async register(req: AuthRequest, res: Response) {
    // Store user on the app database
    const userID = await userService.register(req.scopeData!);

    const userToken = jsonwebtoken.sign(userID, envs.JWT_SECRET);

    // Send user token via cookies (contains userID)
    res.cookie(cookieName, userToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.json({
      data: userID,
      message: 'user created succesfully',
    });
  }

  async login(req: AuthRequest, res: Response) {
    const user = await userService.login(req.scopeData!);

    const userToken = jsonwebtoken.sign({ id: user.id }, envs.JWT_SECRET);

    res.cookie(cookieName, userToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.json({
      message: 'user logged in succesfully',
    });
  }

  logout(_req: Request, res: Response) {
    res.clearCookie(cookieName);
    res.json({
      ok: true,
      message: 'log out succesfully',
    });
  }
}

export const authController = new AuthController();
