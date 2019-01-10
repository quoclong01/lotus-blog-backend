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
      type: dataTypes.TEXT
    }
  }, {
    freezeTableName: true
  })

  User.updateAge = async (id) => {
    let result = await User.update({ age: sequelize.literal('age + 1') }, {
      where: { id: id }
    })
    return result[0] === 1 ? await User.find({where: { id: id }}) : null
  }

  return User
}
