import { DataTypes, Model, Optional } from 'sequelize';
import db  from '../config/database';

interface ChatAttributes {
  id: number;
  member: JSON;
}

interface ChatCreationAttributes extends Optional<ChatAttributes, 'id'> {}

export class Chat extends Model<ChatAttributes, ChatCreationAttributes> implements ChatAttributes, ChatCreationAttributes {
  public id!: number;
  public member!: JSON;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

}

Chat.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  member: {
    type: DataTypes.JSON
  }
}, {
  // Other model options go here
  sequelize: db.sequelize, // We need to pass the connection instance
  tableName: 'Chat' // We need to choose the model name
});
