import { DataTypes, Model, Optional } from 'sequelize';
import db  from '../config/database';

interface MessageAttributes {
  id: number;
  chatId: string;
  senderId: string;
  text: string;
}

interface MessageCreationAttributes extends Optional<MessageAttributes, 'id'> {}

export class Message extends Model<MessageAttributes, MessageCreationAttributes> implements MessageAttributes, MessageCreationAttributes {
  public id!: number;
  public chatId: string;
  public senderId: string;
  public text: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

}

Message.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  chatId: {
    type: DataTypes.STRING
  },
  senderId: {
    type: DataTypes.STRING
  },
  text: {
    type: DataTypes.STRING
  },
}, {
  // Other model options go here
  sequelize: db.sequelize, // We need to pass the connection instance
  tableName: 'Message' // We need to choose the model name
});
