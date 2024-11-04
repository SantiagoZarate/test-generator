import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validateData(schema: z.ZodObject<any, any>) {
  return (req: Request, _res: Response, next: NextFunction) => {
    schema.parse(req.body);
    next();
  };
}
