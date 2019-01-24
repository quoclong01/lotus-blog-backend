const Sequelize = require('sequelize')
const fs = require('fs')
const path = require('path')
const basename  = path.basename(__filename)
const config = require('../config')

const sequelize = new Sequelize(config.db.db_name, config.db.db_user, config.db.db_password, {
  host: config.db.db_host,
  dialect: config.db.db_dialect,
  port: config.db.db_port,
  operatorsAliases: false
});

/** @type 
 * {
 *   { [x: string]: Sequelize.Model, 
 *      sequelize: Sequelize.Sequelize, 
 *      Sequelize: Sequelize.SequelizeStatic
 *   }
 * } 
 * */
let db = {}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  })
  .forEach((file) => {
    let model = sequelize['import'](path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize

module.exports = db
