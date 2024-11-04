import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import getDbCredentials from '../config/db';
import { envs } from '../config/envs';
import schemas from './schemas';

const client = createClient(getDbCredentials());

export const db = drizzle(client, {
  logger: envs.MODE === 'development',
  schema: schemas,
});
