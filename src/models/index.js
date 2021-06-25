import { User } from './User';
import { Auth } from './Auth';
import { Follower } from './Follower';

Auth.belongsTo(User, { targetKey: 'id', foreignKey: 'userId', as: 'user'});
Follower.belongsTo(User, { targetKey: 'id', foreignKey: 'userId', as: 'user'});
Follower.belongsTo(User, { targetKey: 'id', foreignKey: 'followerId', as: 'user'});
Post.belongsTo(User, { targetKey: 'id', foreignKey: 'userId', as: 'user'});

export {
  User,
  Auth,
  Follower
}
