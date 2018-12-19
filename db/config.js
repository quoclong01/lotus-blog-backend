const db = require('../src/config').db;

module.exports = {
  username: db.db_user,
  password: db.db_password,
  database: db.db_name,
  host: db.db_host,
  dialect: 'mysql',
  migrationStorage: 'none',
  seederStorage: 'sequelize',
  seederStorageTableName: 'Seeder',
  autoMigrateOldSchema: true
};
