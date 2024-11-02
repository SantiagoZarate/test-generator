import { Request, Response } from "express";

export function healthcheck(_req: Request, res: Response) {
  res.json({
    ok: true,
    message: "Server up and running!",
    time: new Date(),
  });
}
