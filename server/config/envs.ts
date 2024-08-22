import { z } from "zod";
import { config } from "dotenv";
config();

const envsShema = z.object({
  MODE: z.enum(["dev", "prod"]),
  PORT: z.coerce.number(),
});

export const envs = envsShema.parse({
  MODE: process.env.MODE,
  PORT: process.env.PORT,
});
