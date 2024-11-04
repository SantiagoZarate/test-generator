import cors from "cors";
import { Application, json, urlencoded } from "express";
import morgan from "morgan";
import { envs } from "../../config/envs";

export function setMiddleware(app: Application) {
  // Allow incoming post requests
  app.use(json());
  app.use(
    urlencoded({
      extended: true,
    }),
  );

  // Log requests on dev mode
  if (envs.MODE === "development") {
    app.use(morgan("dev"));
  }

  // Allow CORS
  app.use(cors());
}
