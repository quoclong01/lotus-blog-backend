import { DataTypes, Model, Optional } from 'sequelize';
import db  from '../config/database';
import { Auth } from '../models/Auth';
import { hashPassword, comparePassword, generateAccessToken, generateResetToken } from '../lib/utils';
import { providerType } from '../lib/constants';

interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  dob: string;
  displayName: string;
  picture: string;
  isActive: boolean;
  isAdmin: boolean;
  verifyAt: boolean;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes, UserCreationAttributes {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public phone!: string;
  public gender!: string;
  public dob!: string;
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
        status: 409
      }
    } else {
      const userTemp = new User({
        ...data,
      });
      const user = await userTemp.save();
      const passwordHash = await hashPassword(data.password);
      const auth = {
        // TODO handle dynamic providerType
        providerType: providerType.email,
        password: passwordHash,
        accessToken: '',
        refreshToken: '',
        resetToken: '',
        userId: user.id
      };
      await Auth.create(auth);
      return {
        status: 200,
        message: 'Create an account successfully.'
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
        where: { userId: userTemp.id, providerType: providerType.email }
      });

      const isValidPassword = await comparePassword(data.password, authTemp.password);

      if (isValidPassword) {
        const accessToken = await generateAccessToken(authTemp);
        authTemp.update({ accessToken });
        userTemp.update({ verifyAt: true });

        return{
          accessToken,
          userInfo: userTemp
        };
      }
      return { status: 401, message: 'Invalid password.'}
    }
    return null;
  }

  public static async logoutUser(authInfo: any) {
    const authTemp = await Auth.findOne({
      where: { userId: authInfo.userId, providerType: providerType.email }
    });

    if (authTemp) {
      authTemp.update({ accessToken: null });
      return { status: 200, message: 'Logout successfully.' }
    }
    return null;
  }

  public static async updateUserInfo(id: number | string, authInfo: any, data: any) {
    if (id === 'me') {
      const userTemp  = await User.findByPk(authInfo.userId);
      delete data.email;
      const userBody = { ...data };
      if (userTemp) {
        await userTemp.update(userBody);
        return userTemp;
      }
      return { status: 401, message: 'Could not find this user.' };
    } else {
      return { status: 403, message: 'You do not have permission to update this user.' };
    }
  }

  public static async updateUserPassword(authInfo: any, data: any ) {
    const authTemp = await Auth.findOne({
      where: { userId: authInfo.userId, providerType: providerType.email }
    });
    if (authTemp) {
      const password = await hashPassword(data.password);
      await authTemp.update({ password });
      return { status: 200, message: 'Change password successfully.' };
    }
    return { status: 401, message: 'Could not find this user.' };
  }

  public static async resetUserPassword(data: any) {
    const userTemp = await User.findOne({
      where: { email: data.email }
    });
    if (userTemp) {
      const authTemp = await Auth.findOne({
        where: { userId: userTemp.id, providerType: providerType.email }
      });
      const resetToken = await generateResetToken(userTemp.id);

      await authTemp.update({ resetToken });
      return { resetToken };
    }
    return { status: 401, message: 'Could not find this user.' };
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
        where: { userId: userTemp.id, providerType: providerType.email}
      });
      
      if (authTemp) {
        authTemp.destroy();
        userTemp.destroy();
        return {
          status: 200,
          message: 'Delete the user successfully.'
        }
      }
      return null;
    }
    return null;
  }

  public static async findUser(paramId: string | number, authInfo: any) {
    const userId = paramId === 'me' ? authInfo.userId : paramId;
    const user  = await User.findByPk(userId);
    return this._showPublicInfo(user);
  }

  private static _showPublicInfo(user: any) {
    const userTemp: any = {};
    const publicField = ['email', 'firstName', 'lastName', 'gender', 'dob', 'phone', 'displayName', 'picture'];
    publicField.forEach((x: string) => {
      userTemp[x] = user[x];
    })
    return userTemp;
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
  firstName: {
    type: DataTypes.STRING
  },
  lastName: {
    type: DataTypes.STRING
  },
  phone: {
    type: DataTypes.STRING
  },
  gender: {
    type: DataTypes.ENUM('male', 'female', 'other'),
  },
  dob: {
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
  tableName: 'Users' // We need to choose the model name
});
