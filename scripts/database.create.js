const { Pool, Client } = require('pg');
require('dotenv').config();

// pools will use environment variables
// for connection information
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: 'postgres',
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.query(`CREATE DATABASE ${process.env.DB_NAME}`, (error, result) => {
  if (error) throw error;
  console.log('Database created: ', result);
  pool.end()
});
