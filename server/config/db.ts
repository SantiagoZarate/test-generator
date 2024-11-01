import { Config } from "@libsql/client";
import path from "path";
import { envs } from "./envs";

let config: Config;

if (envs.MODE === "dev") {
  console.log("DEV MODE");

  config = {
    url: `file:${path.resolve(__dirname, "../drizzle/local.db")}`,
  };
} else {
  console.log("PROD MODE");
  config = {
    url: envs.DB_URL,
    authToken: envs.DB_TOKEN,
  };
}

export default config;
