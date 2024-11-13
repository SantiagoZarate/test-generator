import { NextFunction, Request, Response } from 'express';
import { ZodError, z } from 'zod';
import { BadRequestError } from '../utils/errors';

export function validateData(schema: z.ZodTypeAny) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: unknown) {
      let errorMessage = '';
      (error as ZodError).errors.forEach(({ path, message }) => {
        errorMessage += `${path.join('.')} is ${message}; `;
      });
      throw new BadRequestError(errorMessage);
    }
  };
}
