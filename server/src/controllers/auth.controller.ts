import { Request, Response } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { envs } from '../../config/envs';
import { authService } from '../services/auth.service';
import { userService } from '../services/user.service';
import { BadRequestError } from '../utils/errors';

class AuthController {
  async register(req: Request, res: Response) {
    const { code } = req.query;

    if (!code) {
      throw new BadRequestError('Code must be provided');
    }

    // Exchange the code for the access token
    const info = await authService.getAccesToken(String(code));

    // Consume Google API to get user info
    const userInfo = await authService.getUserInfo(info.access_token);

    // Store user on the app database
    const userID = await userService.register(userInfo);

    const userToken = jsonwebtoken.sign(userID, envs.JWT_SECRET);

    // Send user token via cookies (contains userID)
    res.cookie('sessionToken', userToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.json({
      data: userID,
      message: 'user created succesfully',
    });
  }

  async login() {
    throw new Error('Not implemented yet');
  }

  async logout() {
    throw new Error('Not implemented yet');
  }
}

export const authController = new AuthController();
