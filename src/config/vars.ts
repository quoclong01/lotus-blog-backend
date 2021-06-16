import path from 'path';

// import .env variables
// tslint:disable-next-line: no-var-requires
require('dotenv-safe').config({
  allowEmptyValues: true,
  path: path.join(__dirname, '../../.env')
});

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbMaxPool: process.env.DB_MAX_POOL,
  dbMinPool: process.env.DB_MIN_POOL,
  dbAcquire: process.env.DB_ACQUIRE,
  dbIdle: process.env.DB_IDLE
};
