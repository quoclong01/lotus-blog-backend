const path = require('path');

let config = {};

if (process.env.NODE_ENV !== 'production') {
  require('dotenv-safe').config({
    allowEmptyValues: true,
    path: path.join(__dirname, '../.env')
  });
  config = {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    seederStorage: 'sequelize',
    seederStorageTableName: 'Seeder',
    autoMigrateOldSchema: true
  };
} else {
  config = {
    use_env_variable: 'DATABASE_URL',
    dialect: 'mysql',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  };
}
module.exports = config;
