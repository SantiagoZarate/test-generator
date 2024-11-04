import { Config } from '@libsql/client';
import path from 'path';
import { envs } from './envs';

function getDbCredentials(): Config {
  if (envs.MODE !== 'production') {
    return {
      url: `file:${path.join(process.cwd(), `/drizzle/local.${envs.MODE}.db`)}`,
    };
  }

  return {
    url: envs.DB_URL,
    authToken: envs.DB_TOKEN,
  };
}

export default getDbCredentials;
