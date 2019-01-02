const sequelize = require('sequelize')
/**
 * @param {Sequelize} sequelize
 * @param {DataTypes} dataTypes
 */
module.exports = (sequelize, dataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: dataTypes.STRING
    },
    age: {
      type: dataTypes.INTEGER
    },
    comment: {
      type: dataTypes.STRING
    }
  }, {
    freezeTableName: true
  })
  User.updateAge = async (id) => {
    return await User.update({ age: sequelize.literal('age + 1') }, { where: { id: id } })
  }
  return User
}
