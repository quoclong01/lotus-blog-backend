import { User } from './User';
import { Auth } from './Auth';
import { Bookmark } from './Bookmark';
import { Post } from './Post';
import { Follower } from './Follower';


Auth.belongsTo(User, { targetKey: 'id', foreignKey: 'userId', as: 'user'});
Post.belongsTo(User, { targetKey: 'id', foreignKey: 'userId', as: 'user'});
Bookmark.belongsTo(User, { targetKey: 'id', foreignKey: 'userId', as: 'user'});
Bookmark.belongsTo(Post, { targetKey: 'id', foreignKey: 'postId', as: 'post'});
Follower.belongsTo(User, { targetKey: 'id', foreignKey: 'followerId', as: 'followingInfo' });
Follower.belongsTo(User, { targetKey: 'id', foreignKey: 'followingId', as: 'followerInfo' });

User.hasMany(Post, { sourceKey: 'id', foreignKey: 'userId' });

export {
  User,
  Post,
  Auth,
  Bookmark,
  Follower
}
