import { Config } from '@libsql/client';
import path from 'path';
import { envs } from './envs';

let config: Config;

// If we are in production mode, override config
if (envs.MODE === 'production') {
  config = {
    url: envs.DB_URL,
    authToken: envs.DB_TOKEN,
  };
} else if (envs.MODE === 'test') {
  config = {
    url: `file:${path.resolve(__dirname, '../drizzle/local.test.db')}`,
  };
} else {
  config = {
    url: `file:${path.resolve(__dirname, '../drizzle/local.db')}`,
  };
}

export default config;
