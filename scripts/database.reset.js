const mysql = require('mysql2');
const { exec } = require('child_process');
require('dotenv').config();

try {
  const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  });
  con.connect((err) => {
    if (err) throw err;
    const sql = `DROP DATABASE IF EXISTS ${process.env.DB_NAME};`;
    con.query(sql, (error, result) => {
      if (error) throw error;
      console.log('Reset Table');
    });
  });
  con.connect((err) => {
    if (err) throw err;
    con.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME};`, (error, result) => {
      if (error) throw error;
      console.log('Database created');
      console.log('Start Migrating!!!!');
      exec('sh scripts/migration.sh', (e, stdout, stderr) => {
        if (e) {
          console.log(e);
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        console.log('Finish!!!!');
      });
    });
  });
} catch (e) {
  console.log(e);
}
