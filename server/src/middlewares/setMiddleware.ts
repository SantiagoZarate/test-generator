import { json, urlencoded, Application } from "express";
import morgan from "morgan";
import { envs } from "../../config/envs";
import cors from "cors";

export function setMiddleware(app: Application) {
  // Allow incoming post requests
  app.use(json());
  app.use(
    urlencoded({
      extended: true,
    })
  );

  // Log requests on dev mode
  envs.MODE === "dev" && app.use(morgan("dev"));

  // Allow CORS
  app.use(cors());
}
