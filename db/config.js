const path = require('path');

require('dotenv-safe').config({
  allowEmptyValues: true,
  path: path.join(__dirname, '../.env')
});

let config = {};
if (process.env.NODE_ENV === 'development') {
  config = {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    seederStorage: 'sequelize',
    seederStorageTableName: 'Seeder',
    autoMigrateOldSchema: true,
  };
} else if (process.env.NODE_ENV === 'production') {
  config = {
    "use_env_variable": process.env.DATABASE_URL
  };
}

module.exports = config;
