import { NextFunction, Response } from 'express';
import { envs } from '../../../config/envs';
import { authService } from '../../services/auth.service';
import { AuthRequest } from '../../types/authRequest';
import { BadRequestError } from '../../utils/errors';

export async function checkCode(
  req: AuthRequest,
  _res: Response,
  next: NextFunction,
) {
  const { code } = req.query;

  if (!code) {
    throw new BadRequestError('Code must be provided');
  }

  const isLogin = req.path.includes('/login');
  const redirectUri = isLogin ? '/redirect-login' : '/redirect';

  // Exchange the code for the access token
  const info = await authService.getAccesToken(
    String(code),
    envs.CLIENT_DOMAIN + redirectUri,
  );

  // Consume Google API to get user info
  const userInfo = await authService.getUserInfo(info.access_token);
  console.log({ userInfo });

  req.scopeData = userInfo;
  next();
}
