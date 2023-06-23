import { DataTypes, Model, Optional, QueryTypes } from 'sequelize';
import db  from '../config/database';

interface ChatAttributes {
  id: number;
  members: JSON;
}

interface ChatCreationAttributes extends Optional<ChatAttributes, 'id'> {}

export class Chat extends Model<ChatAttributes, ChatCreationAttributes> implements ChatAttributes, ChatCreationAttributes {
  public id!: number;
  public members!: JSON;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static async userChats(userId: any) {
    try {
      const data = await this.sequelize.query(
        `SELECT * FROM chat WHERE JSON_CONTAINS(members, '["${userId}"]');`,
        {
          type: QueryTypes.SELECT,
          nest: true
        }
        );
        return data;
    }
    catch (error) {
      throw new Error(error);
    }
  }
  public static async findChat(params: any) {
    try {
      const data = await this.sequelize.query(
        `SELECT * FROM chat WHERE JSON_CONTAINS(members, '["${params.firstId}", "${params.secondId}"]');`,
        {
          type: QueryTypes.SELECT,
          nest: true
        }
        );
        return data;
    }
    catch (error) {
      throw new Error(error);
    }
  }
}

Chat.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  members: {
    type: DataTypes.JSON
  }
}, {
  // Other model options go here
  sequelize: db.sequelize, // We need to pass the connection instance
  tableName: 'Chat' // We need to choose the model name
});
