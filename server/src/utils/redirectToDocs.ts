import { NextFunction, Request, Response } from "express";

export function redirectToDocs(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.redirect("/api/docs");
  next();
}
