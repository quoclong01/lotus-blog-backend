const sequelize = require('sequelize')
/**
 * @param {Sequelize} sequelize
 * @param {DataTypes} dataTypes
 */
module.exports = (sequelize, dataTypes) => {
  const Character = sequelize.define('Character', {
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

  Character.updateAge = async (id) => {
    let result = await Character.update({ age: sequelize.literal('age + 1') }, {
      where: { id: id }
    })
    return result[0] === 1 ? await Character.find({where: { id: id }}) : null
  }

  Character.createComment = async (data) => {
    // data.name = data.name.trim().replace(/\n*/g, ' ')
    data.comment = data.comment ? data.comment.trim().replace(/(\n){3,}/g, '\n\n') : null
    let character = new Character(data)
    return await character.save()
  }

  Character.removeCharacter = async (id) => {
    let item = 0
    let user = await Character.find({where: { id: id }})
    if (user !== null) {
      item = await Character.destroy({where: {id: user.id}})
    }
    return item !== 0 ? user : null
  }

  return Character
}
