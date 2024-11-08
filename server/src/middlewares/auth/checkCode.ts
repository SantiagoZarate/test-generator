import { NextFunction, Response } from 'express';
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

  // Exchange the code for the access token
  const info = await authService.getAccesToken(String(code));

  // Consume Google API to get user info
  const userInfo = await authService.getUserInfo(info.access_token);

  req.scopeData = userInfo;
  next();
}
