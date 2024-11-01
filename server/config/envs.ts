import { config } from "dotenv";
import { z } from "zod";
config();

const envsShema = z.object({
  MODE: z.enum(["dev", "prod"]).default("dev"),
  PORT: z.coerce.number(),
  DB_URL: z.string(),
  DB_TOKEN: z.string(),
  SEED: z.coerce.boolean().optional(),
});

export const envs = envsShema.parse({
  MODE: process.env.MODE,
  PORT: process.env.PORT,
  DB_URL: process.env.TURSO_DB_URL,
  DB_TOKEN: process.env.TURSO_DB_TOKEN,
  SEED: process.env.SEED || false,
});
