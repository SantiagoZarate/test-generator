import express from "express";
import { setMiddleware } from "./middlewares/setMiddleware";
import { envs } from "../config/envs";
import testRouter from "./router/test.router";

const app = express();

setMiddleware(app);

// Handlers
app.use("/api/tests", testRouter);

export const start = () => {
  app.listen(envs.PORT, () => {
    console.log(`Server running on http://localhost:${envs.PORT ?? 3000}`);
  });
};
