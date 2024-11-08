import { NextFunction, Response } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { envs } from '../../config/envs';
import { AuthRequest, UserData } from '../types/authRequest';
import { UnauthorizedError } from '../utils/errors';

export function validateToken(
  req: AuthRequest,
  _res: Response,
  next: NextFunction,
) {
  console.log(req.cookies);

  const token = req.cookies['sessionToken'];

  if (!token) {
    throw new UnauthorizedError('token is not provided in cookies');
  }

  try {
    const verifiedToken = jsonwebtoken.verify(token, envs.JWT_SECRET);
    req.user = verifiedToken as UserData;
    next();
  } catch (error) {
    console.log(error);
    throw new Error('There was an error decoding the token');
  }
}
