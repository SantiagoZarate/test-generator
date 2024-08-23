import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ApiError } from "../utils/errors";

export function errorMiddleware(
  error: ApiError,
  request: Request,
  res: Response,
  next: NextFunction
) {
  let message: string = error.message ?? "Internal server error";
  const statusCode = error.statusCode ?? 500;

  if (error instanceof ZodError) {
    message = "";
    error.errors.forEach((issue: any) => {
      message += `${issue.path.join(".")} is ${issue.message}; `;
    });
  }

  res.status(statusCode).json({
    ok: false,
    status: statusCode,
    message,
  });

  next(error);
}
