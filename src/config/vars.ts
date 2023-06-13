import path from 'path';
require('dotenv').config();

// import .env variables
// tslint:disable-next-line: no-var-requires
if (process.env.NODE_ENV === 'development') {
  require('dotenv-safe').config({
    allowEmptyValues: true,
    path: path.join(__dirname, '../../.env')
  });
}

console.log({
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  dbHost: process.env.MYSQL_HOST,
  dbPort: process.env.MYSQL_PORT,
  dbName: process.env.MYSQL_DATABASE,
  dbUser: process.env.MYSQL_USER,
  dbPassword: process.env.MYSQL_PASSWORD,
  dbMaxPool: process.env.DB_MAX_POOL,
  dbMinPool: process.env.DB_MIN_POOL,
  dbAcquire: process.env.DB_ACQUIRE,
  dbIdle: process.env.DB_IDLE
})

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  dbHost: process.env.MYSQL_HOST,
  dbPort: process.env.MYSQL_PORT,
  dbName: process.env.MYSQL_DATABASE,
  dbUser: process.env.MYSQL_USER,
  dbPassword: process.env.MYSQL_PASSWORD,
  dbMaxPool: process.env.DB_MAX_POOL,
  dbMinPool: process.env.DB_MIN_POOL,
  dbAcquire: process.env.DB_ACQUIRE,
  dbIdle: process.env.DB_IDLE
};
