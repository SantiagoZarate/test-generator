import { Config } from '@libsql/client';
import path from 'path';
import { envs } from './envs';

let config: Config = {
  url: `file:${path.resolve(__dirname, '../drizzle/local.db')}`,
};

// If we are in production mode, override config
if (envs.MODE === 'production') {
  config = {
    url: envs.DB_URL,
    authToken: envs.DB_TOKEN,
  };
}

export default config;
