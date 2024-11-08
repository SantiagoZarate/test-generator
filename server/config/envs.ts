import { config } from 'dotenv';
import { z } from 'zod';

const path: string = `.env.${process.env.NODE_ENV}`;
config({ path });

const envsShema = z.object({
  MODE: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number(),
  DB_URL: z.string(),
  DB_TOKEN: z.string(),
  SEED: z.coerce.boolean().optional(),
  CLIENT_ID: z.string(),
  CLIENT_SECRET: z.string(),
  JWT_SECRET: z.string(),
});

export const envs = envsShema.parse({
  MODE: process.env.NODE_ENV,
  PORT: process.env.PORT || 4000,
  DB_URL: process.env.TURSO_DB_URL || '',
  DB_TOKEN: process.env.TURSO_DB_TOKEN || '',
  SEED: process.env.SEED || false,
  CLIENT_ID: process.env.CLIENT_ID || '',
  CLIENT_SECRET: process.env.CLIENT_SECRET || '',
  JWT_SECRET: process.env.JWT_SECRET || '',
});
