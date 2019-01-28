const sequelize = require('sequelize')

/**
 * @param {Sequelize} sequelize an instance of Sequelize
 * @param {DataTypes} dataTypes the DataType Library Sequelize support 
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

  /**
  * @functionName updateAge
  * @functionDescription Increase age for character with the specific id.
  * @functionHandle Auto increase age +1 .
  * @functionReturn a character with age increased, or null if the character with id is not exist.
  * @params id (Number)
  **/
  Character.updateAge = async (id) => {
    let result = await Character.update({ 
      age: sequelize.literal('age + 1') },{ 
      where: { id: id } 
    })
    return result[0] === 1 ? await Character.find({where: { id: id }}) : null
  }

  /**
  * @functionName createCharacter
  * @functionDescription Create a new Character with the attach data (name, age, comment)
  * @functionHandle This function make trim the comment and return the new object characters.
  * @functionReturn return the new object characters.
  * @params data (Object)
  **/
  Character.createCharacter = async (data) => {
    data.name = data.name.trim().replace(/\n+/g, ' ')
    data.comment = data.comment ? data.comment.trim().replace(/(\n){3,}/g, '\n\n') : null
    let character = new Character(data)
    return await character.save()
  }

  /**
  * @functionName removeCharacter
  * @functionDescription Remove the specific Character with id
  * @functionReturn return the deleted characters or null if the character have that id is not exist.
  * @params data (Object)
  **/
  Character.removeCharacter = async (id) => {
    // find and delete character
    return Character.find({ 
      where: { id: id } 
    }).then((character) => {
      if (character) {
        return character.destroy()
      } else {
        return null
      }
    })
  }

  return Character
}
