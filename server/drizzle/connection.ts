import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import dbConfig from '../config/db';
import { envs } from '../config/envs';
import schemas from './schemas';

const client = createClient(dbConfig);

export const db = drizzle(client, {
  logger: envs.MODE === 'development',
  schema: schemas,
});
