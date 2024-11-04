import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../utils/errors';

export function errorMiddleware(
  error: ApiError,
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  const errorMessage: string = error.message ?? 'Internal server error';
  const statusCode = error.statusCode ?? 500;

  res.status(statusCode).json({
    ok: false,
    status: statusCode,
    message: errorMessage,
  });

  next(error);
}
