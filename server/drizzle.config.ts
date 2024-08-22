import { defineConfig } from "drizzle-kit";
import { envs } from "./config/envs";

export default defineConfig({
  dialect: "sqlite",
  schema: "./drizzle/schemas/*",
  out: "./drizzle",
  driver: "turso",
  dbCredentials: {
    url: envs.DB_URL,
    authToken: envs.DB_TOKEN,
  },
});
