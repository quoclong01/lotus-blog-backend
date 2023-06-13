const mysql = require('mysql2');
const { exec } = require('child_process');
require('dotenv').config();

try {
  const con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD
  });
  con.connect((err) => {
    if (err) throw err;
    const sql = `DROP DATABASE IF EXISTS ${process.env.MYSQL_DATABASE};`;
    con.query(sql, (error, result) => {
      if (error) throw error;
      console.log('Reset Table');
    });
  });
  con.connect((err) => {
    if (err) throw err;
    con.query(`CREATE DATABASE IF NOT EXISTS ${process.env.MYSQL_DATABASE};`, (error, result) => {
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
