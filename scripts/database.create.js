const mysql = require('mysql2');
const { exec } = require('child_process');
require('dotenv').config();

try {
  const con = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  });
  con.connect((err) => {
    if (err) throw err;
    con.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME};`, (error, result) => {
      if (error) throw error;
      console.log('Database created');
    });
  });
} catch (e) {
  console.log(e);
}
