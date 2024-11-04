import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { ApiError } from '../utils/errors';

export function errorMiddleware(
  error: ApiError,
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  let errorMessage: string = error.message ?? 'Internal server error';
  const statusCode = error.statusCode ?? 500;

  if (error instanceof ZodError) {
    errorMessage = '';
    error.errors.forEach(({ path, message }) => {
      errorMessage += `${path.join('.')} is ${message}; `;
    });
  }

  res.status(statusCode).json({
    ok: false,
    status: statusCode,
    message: errorMessage,
  });

  next(error);
}
