import { NextFunction, Request, Response } from 'express';
import { z, ZodError } from 'zod';
import { BadRequestError } from '../utils/errors';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validateData(schema: z.ZodObject<any, any>) {
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
