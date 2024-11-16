import { Request, Response } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { envs } from '../../config/envs';
import { userService } from '../services/user.service';
import { AuthRequest } from '../types/authRequest';

class AuthController {
  async register(req: Request, res: Response) {
    const data = await userService.registerWithPassword(req.body);

    res.json({
      ok: true,
      message: 'user registered succesfully',
      data,
    });
  }

  async login(req: Request, res: Response) {
    const user = await userService.loginWithPassword(req.body);

    const accessToken = jsonwebtoken.sign({ id: user.id }, envs.JWT_SECRET, {
      expiresIn: '2m',
    });

    const refreshToken = jsonwebtoken.sign({ id: user.id }, envs.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.json({
      ok: true,
      message: 'user logged in succesfully',
      data: user,
    });
  }

  async googleRegister(req: AuthRequest, res: Response) {
    const userID = await userService.register(req.scopeData!);

    const userToken = jsonwebtoken.sign({ id: userID.id }, envs.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Send user token via cookies (contains userID)
    res.cookie('accessToken', userToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.json({
      data: userID,
      message: 'user created succesfully',
    });
  }

  async googleLogin(req: AuthRequest, res: Response) {
    const user = await userService.login(req.scopeData!);

    const accessToken = jsonwebtoken.sign({ id: user.id }, envs.JWT_SECRET, {
      expiresIn: '2m',
    });

    const refreshToken = jsonwebtoken.sign({ id: user.id }, envs.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.json({
      ok: true,
      data: user,
      message: 'user logged in succesfully',
    });
  }

  logout(_req: Request, res: Response) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.json({
      ok: true,
      message: 'log out succesfully',
    });
  }

  async getUser(req: AuthRequest, res: Response) {
    const userData = await userService.getUser({ id: req.user!.id });
    res.json({
      data: userData,
      message: 'user data retrieved',
    });
  }
}

export const authController = new AuthController();
