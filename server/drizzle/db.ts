import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { envs } from "../config/envs";
import schemas from "./schemas";

const client = createClient({
  url: envs.DB_URL,
  authToken: envs.DB_TOKEN,
});

export const db = drizzle(client, {
  logger: true,
  schema: schemas,
});
