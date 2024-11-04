import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import dbConfig from '../config/db';
import schemas from './schemas';

const client = createClient(dbConfig);

export const db = drizzle(client, {
  logger: true,
  schema: schemas,
});
