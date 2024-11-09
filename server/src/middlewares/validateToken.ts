import { NextFunction, Response } from 'express';
import jsonwebtoken, { TokenExpiredError } from 'jsonwebtoken';
import { envs } from '../../config/envs';
import { AuthRequest, UserData } from '../types/authRequest';
import { UnauthorizedError } from '../utils/errors';

export function validateToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  const accessToken = req.cookies['accessToken'];
  const refreshToken = req.cookies['refreshToken'];

  if (!accessToken) {
    throw new UnauthorizedError('token is not provided in cookies');
  }

  try {
    const verifiedToken = jsonwebtoken.verify(accessToken, envs.JWT_SECRET);
    req.user = verifiedToken as UserData;
    return next();
  } catch (error) {
    if (!(error instanceof TokenExpiredError)) {
      console.log(error);
      throw new UnauthorizedError('Invalid access token');
    }
  }

  if (!refreshToken) {
    throw new UnauthorizedError('refresh token is not provided in cookies');
  }

  try {
    const verifiedRefreshToken = jsonwebtoken.verify(
      refreshToken,
      envs.JWT_SECRET,
    );
    const userId = (verifiedRefreshToken as UserData).id;

    // Generate a new access token
    const newAccessToken = jsonwebtoken.sign({ id: userId }, envs.JWT_SECRET, {
      expiresIn: '2m',
    });

    // Set the new access token in the response cookies
    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    req.user = verifiedRefreshToken as UserData;
    console.log('TOKEN EXPIRO PERO SE GENERO UNO NUEVO');
    return next();
  } catch (e) {
    console.log(e);
    throw new UnauthorizedError('Invalid or expired refresh token');
  }
}
