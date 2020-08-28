import { DataTypes, Model, Optional } from 'sequelize';
import db  from '../config/database';

interface CharacterAttributes {
  id: number;
  name: string;
  age: number;
  comment: string;
}

// You can also set multiple attributes optional at once
interface CharacterCreationAttributes extends Optional<CharacterAttributes, 'id'> {}

export class Character extends Model<CharacterAttributes, CharacterCreationAttributes> implements CharacterAttributes, CharacterCreationAttributes {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public name!: string;
  public comment!: string | null; // for nullable fields
  public age!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

   /*
    * @functionName updateAge
    * @functionDescription Increase age for character with the specific id.
    * @functionHandle Auto increase age +1 .
    * @functionReturn a character with age increased, or null if the character with id is not exist.
    * @params id (Number)
  */
  public static async updateAge(id: string) {
    // find and update character
    const character = await Character.findOne({
      where: { id }
    });
    if (character) {
      return character.update({
        age: character.age + 1
      });
    }
    else {
      return null;
    }
  }

  /*
    * @functionName createCharacter
    * @functionDescription Create a new Character with the attach data (name, age, comment)
    * @functionHandle This function make trim the comment and return the new object characters.
    * @functionReturn return the new object characters.
    * @params data (Object)
  */
 public static async createCharacter(data: any) {
    data.name = data.name.trim().replace(/\n+/g, ' ');
    data.comment = data.comment ? data.comment.trim().replace(/(\n){3,}/g, '\n\n') : null;
    const character = new Character(data);
    return await character.save();
  }

  /*
    * @functionName removeCharacter
    * @functionDescription Remove the specific Character with id
    * @functionReturn return the deleted characters or null if the character have that id is not exist.
    * @params data (Object)
  **/
 public static async removeCharacter(id: string) {
    // find and delete character
    return Character.findOne({
      where: { id }
    }).then((character) => {
      return character? character.destroy(): null;
    });
  }
}

Character.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  comment: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  // Other model options go here
  sequelize: db.sequelize, // We need to pass the connection instance
  tableName: 'Character' // We need to choose the model name
});
