import { DataTypes, Model, Optional } from 'sequelize';
import db  from '../config/database';
// import bcrypt from 'bcrypt';
// import { hashPassword } from '../lib/utils';

interface AuthAttributes {
  id: number;
  providerType: string;
  saveToken: string;
  refreshToken: string;
  userId: number;
}

interface AuthCreationAttributes extends Optional<AuthAttributes, 'id'> {}

export class Auth extends Model<AuthAttributes, AuthCreationAttributes> implements AuthAttributes, AuthCreationAttributes {
  public id!: number;
  public providerType!: string;
  public saveToken!: string;
  public refreshToken!: string;
  public userId!: number;


  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  /*
    * @functionName createAuth
    * @functionDescription Create a new Auth with the attach data ()
    * @functionHandle This function make trim all attached data and return the new object user.
    * @functionReturn return the new object auth.
    * @params data (Object)
  */
  public static async createAuth(data: any) {
    const auth = new Auth(data);
    return auth.save();
  }

  /*
    * @functionName removeAuth
    * @functionDescription Remove the specific Auth with id
    * @functionReturn return the deleted auth or null if the user have that id is not exist.
    * @params data (Object)
  **/
  public static async removeAuth(id: string) {
    return { data: "remove auth" }
  }
}

Auth.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  providerType: {
    type: DataTypes.ENUM('facebook', 'google', 'email', 'github'),
    allowNull: false
  },
  saveToken: {
    type: DataTypes.STRING
  },
  refreshToken: {
    type: DataTypes.STRING
  },
  userId: {
    type: DataTypes.INTEGER.UNSIGNED,
  },
}, {
  // Other model options go here
  sequelize: db.sequelize, // We need to pass the connection instance
  tableName: 'Auth' // We need to choose the model name
});
