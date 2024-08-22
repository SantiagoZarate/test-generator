import { z } from "zod";
import { config } from "dotenv";
config();

const envsShema = z.object({
  MODE: z.enum(["dev", "prod"]),
  PORT: z.coerce.number(),
  DB_URL: z.string(),
  DB_TOKEN: z.string(),
});

export const envs = envsShema.parse({
  MODE: process.env.MODE,
  PORT: process.env.PORT,
  DB_URL: process.env.TURSO_DB_URL,
  DB_TOKEN: process.env.TURSO_DB_TOKEN,
});
