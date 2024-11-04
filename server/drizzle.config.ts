import { defineConfig } from 'drizzle-kit';
import getDbCredentials from './config/db';

export default defineConfig({
  dialect: 'sqlite',
  schema: './drizzle/schemas/*',
  out: './drizzle/migrations',
  driver: 'turso',
  dbCredentials: getDbCredentials(),
});
