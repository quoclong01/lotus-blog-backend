import { Post } from './Post';
import { DataTypes, Model, Optional, Op } from 'sequelize';
import db from '../config/database';
import { Auth } from '../models/Auth';
import { hashPassword, comparePassword, generateAccessToken, generateResetToken } from '../lib/utils';
import { ProviderType } from '../lib/enum';
import { UserErrors } from '../lib/api-error';

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
  followers: number;
  followings: number;
  verifyAt: boolean;
}

class RequestUser {
  email?: string; 
  password?: string; 
  firstName?: string; 
  lastName?: string; 
  gender?: string; 
  dob?: string; 
  displayName?: string;
  phone?: string;

  constructor(data: any, strict = false) {
    if (data.firstName) this.firstName = data.firstName.trim().replace(/\n+/g, ' ');
    if (data.lastName) this.lastName = data.lastName.trim().replace(/\n+/g, ' ');
    if (data.displayName) this.displayName = data.displayName.trim().replace(/\n+/g, ' ');

    if (!strict && data.email) this.email = data.email;
    if (!strict && data.password) this.password = data.password;
    if (data.gender) this.gender = data.gender;
    if (data.dob) this.dob = data.dob;
    if (data.phone) this.phone = data.phone;
  }
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

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
  public followers!: number;
  public followings!: number;
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
  public static async createUser(data: any) {
    const existUser = await User.findOne({
      where: { email: data.email }
    });
    if (existUser) throw UserErrors.ALREADY_USER_EXISTED;

    const existDisplayName = await User.findOne({
      where: { displayName: data.displayName }
    });
    if (existDisplayName) throw UserErrors.ALREADY_DISPLAYNAME_EXISTED;

    const dataTemp: any = new RequestUser(data);
    const userTemp = new User({ ...dataTemp });
    const user = await userTemp.save();
    const passwordHash = await hashPassword(data.password);
    const auth = {
      // TODO handle dynamic providerType
      providerType: ProviderType.EMAIL,
      password: passwordHash,
      accessToken: '',
      refreshToken: '',
      resetToken: '',
      userId: user.id
    };
    await Auth.create(auth);
    return 'Create an account successfully.';
  }

  public static async loginUser(data: any) {
    const userTemp = await User.findOne({
      where: { email: data.email },
      attributes: [
        'id', 'email', 'firstName', 'lastName',
        'gender', 'phone', 'dob', 'displayName', 'picture',
        'verifyAt'
      ]
    });
    if (!userTemp) throw UserErrors.LOGIN_FAILED;

    const authTemp = await Auth.findOne({
      where: { userId: userTemp.id, providerType: ProviderType.EMAIL }
    });
    const isValidPassword = await comparePassword(data.password, authTemp.password);

    if (!isValidPassword) throw UserErrors.LOGIN_FAILED;

    const accessToken = await generateAccessToken(authTemp);
    await authTemp.update({ accessToken });
    if (!userTemp.verifyAt) await userTemp.update({ verifyAt: Date.now() });

    return { accessToken, userInfo: userTemp };
  }

  public static async logoutUser(authInfo: any) {
    const authTemp = await Auth.findOne({
      where: { userId: authInfo.userId, providerType: ProviderType.EMAIL }
    });

    if (!authTemp) throw UserErrors.LOGOUT_FAILED;

    authTemp.update({ accessToken: null });
    return 'Logout successfully.';
  }

  public static async updateUserInfo(id: number | string, authInfo: any, data: any) {
    if (id !== 'me') throw UserErrors.INTERACT_PERMISSION;

    const userTemp = await User.findByPk(authInfo.userId);
    const dataTemp: any = new RequestUser(data, true);

    if (!userTemp) throw UserErrors.NOT_FOUND;

    const userDisplayNameTemp = await User.findOne({
      where: {
        displayName: dataTemp.displayName,
        id: {
          [Op.not]: authInfo.userId
        }
      }
    });

    if (userDisplayNameTemp) throw UserErrors.ALREADY_DISPLAYNAME_EXISTED;

    await userTemp.update({...dataTemp});
    return userTemp;
  }

  public static async updateUserPassword(authInfo: any, data: any ) {

    const authTemp = await Auth.findOne({
      where: { userId: authInfo.userId, providerType: ProviderType.EMAIL }
    });
    if (!authTemp) throw UserErrors.NOT_FOUND;

    const isValidPassword = await comparePassword(data.oldPassword, authTemp.password);

    if (!isValidPassword) throw UserErrors.INVALID_PASSWORD;

    const password = await hashPassword(data.password);
    await authTemp.update({ password });
    return 'Change password successfully.';
  }

  public static async resetUserPassword(data: any) {
    const userTemp = await User.findOne({
      where: { email: data.email }
    });

    if (!userTemp) throw UserErrors.NOT_FOUND;

    const authTemp = await Auth.findOne({
      where: { userId: userTemp.id, providerType: ProviderType.EMAIL }
    });
    const resetToken = await generateResetToken(userTemp.id);

    await authTemp.update({ resetToken });
    return { resetToken };
  }

  /*
    * @functionName removeUser
    * @functionDescription Remove the specific User with id
    * @functionReturn return the deleted user or null if the user have that id is not exist.
    * @params data (Object)
  **/
  public static async removeUser(id: string) {
    const userTemp = await User.findOne({
      where: { id }
    });

    if (!userTemp) throw UserErrors.NOT_FOUND;

    const authTemp = await Auth.findOne({
      where: { userId: userTemp.id, providerType: ProviderType.EMAIL }
    });

    if (!authTemp) throw UserErrors.NOT_FOUND;

    await authTemp.destroy();
    await userTemp.destroy();
    return 'Delete the user successfully.';
  }

  public static async findUser(paramId: string | number, authInfo: any) {
    const userId = paramId === 'me' ? authInfo.userId : paramId;
    const user = await User.findByPk(userId, {
      attributes: [
        'email', 'firstName', 'lastName',
        'gender', 'dob', 'phone',
        'displayName', 'picture', 'followers', 'followings'
      ]
    });
    if (!user) throw UserErrors.NOT_FOUND;
    return user;
  }

  public static async getPosts(paramId: string | number, authInfo: any) {
    let data;
    if (paramId === 'me') {
      data = await User.findOne({
        where: { id: authInfo.userId }, include: { model: Post, as: 'Posts', required: false }
      });
    }
    else {
      data = await User.findOne({
        where: { id: paramId }, include: { model: Post, as: 'Posts', where: { status: 'public' }, required: false }
      });
    }
    return data;
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
  followers: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  followings: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  verifyAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize: db.sequelize, // We need to pass the connection instance
  tableName: 'Users' // We need to choose the model name
});
