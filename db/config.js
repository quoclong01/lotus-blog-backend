const db = require('../src/config').db;

module.exports = {
  username: db.dbUser,
  password: db.dbPassword,
  database: db.dbName,
  host: db.dbHost,
  dialect: 'mysql',
  migrationStorage: 'none',
  seederStorage: 'sequelize',
  seederStorageTableName: 'Seeder',
  autoMigrateOldSchema: true
};
