import { User } from './User';
import { Auth } from './Auth';
import { Bookmark } from './Bookmark';
import { Post } from './Post';
import { Follower } from './Follower';


Auth.belongsTo(User, { targetKey: 'id', foreignKey: 'userId', as: 'user'});
Post.belongsTo(User, { targetKey: 'id', foreignKey: 'userId', as: 'user'});
Bookmark.belongsTo(User, { targetKey: 'id', foreignKey: 'userId', as: 'user'});
Bookmark.belongsTo(Post, { targetKey: 'id', foreignKey: 'postId', as: 'post'});

User.hasMany(Post, { sourceKey: 'id', foreignKey: 'userId' });
User.hasMany(Follower, { sourceKey: 'id', foreignKey: 'followerId', as: 'followings' });
User.hasMany(Follower, { sourceKey: 'id', foreignKey: 'followingId', as: 'followers' });

export {
  User,
  Post,
  Auth,
  Bookmark,
  Follower
}
