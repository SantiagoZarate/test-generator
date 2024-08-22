import express, { Request, Response } from "express";
import { setMiddleware } from "./middlewares/setMiddleware";
import { envs } from "../config/envs";

const app = express();

setMiddleware(app);

app.get("/ping", (req: Request, res: Response) => {
  console.log("Running");

  res.json({
    ok: true,
    message: "pong!",
  });
});

export const start = () => {
  app.listen(envs.PORT, () => {
    console.log(`Server running on http://localhost:${envs.PORT ?? 3000}`);
  });
};
