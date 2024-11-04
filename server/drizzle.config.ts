import { defineConfig } from 'drizzle-kit';
import { envs } from './config/envs';

let dbCredentials;

if (envs.MODE === 'development') {
  dbCredentials = {
    url: 'file:./drizzle/local.db',
  };
} else if (envs.MODE === 'test') {
  dbCredentials = {
    url: 'file:./drizzle/local.test.db',
  };
} else {
  dbCredentials = {
    url: envs.DB_URL,
    authToken: envs.DB_TOKEN,
  };
}

export default defineConfig({
  dialect: 'sqlite',
  schema: './drizzle/schemas/*',
  out: './drizzle/migrations',
  driver: 'turso',
  dbCredentials,
});
