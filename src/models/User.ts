import { DataTypes, Model, Optional } from 'sequelize';
import db  from '../config/database';
import { Auth } from '../models/Auth';
import { hashPassword, comparePassword, generateAccessToken } from '../lib/utils';

interface UserAttributes {
  id: number;
  username: string;
  email: string;
  displayName: string;
  picture: string;
  isActive: boolean;
  isAdmin: boolean;
  verifyAt: boolean;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes, UserCreationAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public displayName!: string;
  public picture!: string;
  public isActive!: boolean;
  public isAdmin!: boolean;
  public verifyAt!: boolean;


  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  /*
    * @functionName createUser
    * @functionDescription Create a new User with the attach data (username, email, password, ...)
    * @functionHandle This function make trim all attached data and return the new object user.
    * @functionReturn return the new object user.
    * @params data (Object)
  */
  public static async createUser(data : any) {
    const existUser = await User.findOne({
      where: { email: data.email }
    });
    
    if (existUser) {
      // Todo will check provider if difference provider will be create new one
      return {
        error: "Account have already exist",
        statusCode: 404
      }
    } else {
      const userTemp = new User({
        ...data,
      });
      const user = await userTemp.save();
      const passwordHash = await hashPassword(data.password);
      const auth = {
        // TODO handle dynamic providerType
        providerType: 'email',
        password: passwordHash,
        accessToken: '',
        refreshToken: '',
        userId: user.id
      };
      await Auth.create(auth);
      return {
        statusCode: 200,
        message: 'Create an account successfully'
      };
    }
  }

  public static async loginUser(data: any) {
    const userTemp = await User.findOne({
      where: { email: data.email }
    });
    if (userTemp) {
      // Todo handle dynamic providerType
      const authTemp = await Auth.findOne({
        where: { userId: userTemp.id, providerType: 'email' }
      });

      const isValidPassword = await comparePassword(data.password, authTemp.password);

      if (isValidPassword) {
        const accessToken = await generateAccessToken(authTemp);
        authTemp.update({ accessToken });
        userTemp.update({ verifyAt: true });

        return{ accessToken };
      }
      return { statusCode: 401, message: 'Invalid password.'}
    }
    return null;
  }

  public static async logoutUser({ email }: any) {
    const userTemp = await User.findOne({
      where: { email }
    });
    const authTemp = await Auth.findOne({
      where: { userId: userTemp.id, providerType: 'email' }
    });

    if (authTemp) {
      authTemp.update({ accessToken: '' });
      return { statusCode: 200, message: 'Logout successfully.' }
    }
    return null;
  }

  public static async updateUserInfo(id: string) {
    return { data: `update user info ${id}` }
  }

  /*
    * @functionName removeUser
    * @functionDescription Remove the specific User with id
    * @functionReturn return the deleted user or null if the user have that id is not exist.
    * @params data (Object)
  **/
  public static async removeUser(id: string) {
    // find and delete character
    const userTemp = await User.findOne({
      where: { id }
    });
    if (userTemp) {
      const authTemp = await Auth.findOne({
        where: { userId: userTemp.id, providerType: 'email'}
      });
      
      if (authTemp) {
        authTemp.destroy();
        userTemp.destroy();
        return {
          statusCode: 200,
          message: 'Delete the user successfully.'
        }
      }
      return null;
    }
    return null;
  }
}

User.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING
  },
  username: {
    type: DataTypes.STRING
  },
  displayName: {
    type: DataTypes.STRING
  },
  picture: {
    type: DataTypes.STRING
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  verifyAt: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  // Other model options go here
  sequelize: db.sequelize, // We need to pass the connection instance
  tableName: 'User' // We need to choose the model name
});

User.hasMany(Auth, { as: "auths", foreignKey: "userId" });
