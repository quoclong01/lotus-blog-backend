import { User } from './User';
import { Auth } from './Auth';

Auth.belongsTo(User, { targetKey: 'id', foreignKey: 'userId', as: 'user'});
Post.belongsTo(User, { targetKey: 'id', foreignKey: 'userId', as: 'user'});

export {
  User,
  Auth,
}
