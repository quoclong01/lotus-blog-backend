const mysql = require('mysql2');
require('dotenv').config();

// pools will use environment variables
// for connection information
const config = {
  user: process.env.MYSQL_USER,
  host: process.env.MYSQL_HOST,
  database: 'mysql',
  password: process.env.MYSQL_PASSWORD,
  port: process.env.MYSQL_PORT
};

const pool = mysql.createPool(config);

pool.query(`CREATE DATABASE ${process.env.MYSQL_DATABASE}`, (error, result) => {
  if (error) throw error;
  console.log('Database created: ', result);
  pool.end();
});
