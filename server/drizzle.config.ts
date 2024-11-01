import { defineConfig } from "drizzle-kit";
import { envs } from "./config/envs";

let dbCredentials;

if (envs.MODE === "dev") {
  dbCredentials = {
    url: "file:./drizzle/local.db",
  };
} else {
  dbCredentials = {
    url: envs.DB_URL,
    authToken: envs.DB_TOKEN,
  };
}

export default defineConfig({
  dialect: "sqlite",
  schema: "./drizzle/schemas/*",
  out: "./drizzle/migrations",
  driver: "turso",
  dbCredentials,
});
