import { Like } from './Like';
import { Comment } from './Comment';
import { User } from './User';
import { Auth } from './Auth';
import { Bookmark } from './Bookmark';
import { Post } from './Post';
import { Follower } from './Follower';
import { Chat } from './Chat';
import { Message } from './Message';


Auth.belongsTo(User, { targetKey: 'id', foreignKey: 'userId', as: 'user'});
Post.belongsTo(User, { targetKey: 'id', foreignKey: 'userId', as: 'user'});
Post.hasMany(Like, { sourceKey: 'id', foreignKey: 'postId', as: 'likeInfo' });
Post.hasMany(Bookmark, { sourceKey: 'id', foreignKey: 'postId', as: 'bookmarks' })
Bookmark.belongsTo(User, { targetKey: 'id', foreignKey: 'userId', as: 'user'});
Bookmark.belongsTo(Post, { targetKey: 'id', foreignKey: 'postId', as: 'post'});
Like.belongsTo(User, { targetKey: 'id', foreignKey: 'userId', as: 'user'});
Like.belongsTo(Post, { targetKey: 'id', foreignKey: 'postId', as: 'post'});
Comment.belongsTo(User, { targetKey: 'id', foreignKey: 'userId', as: 'user'});
Comment.belongsTo(Post, { targetKey: 'id', foreignKey: 'postId', as: 'post'});
Follower.belongsTo(User, { targetKey: 'id', foreignKey: 'followerId', as: 'followerInfo' });
Follower.belongsTo(User, { targetKey: 'id', foreignKey: 'followingId', as: 'followingInfo' });

User.hasMany(Post, { sourceKey: 'id', foreignKey: 'userId' });
User.hasMany(Like, { sourceKey: 'id', foreignKey: 'userId' });
User.hasMany(Auth, { sourceKey: 'id', foreignKey: 'userId' });
User.hasMany(Follower, { sourceKey: 'id', foreignKey: 'followerId', as: 'followerInfo' });
User.hasMany(Follower, { sourceKey: 'id', foreignKey: 'followingId', as: 'followingInfo' });

export {
  User,
  Post,
  Auth,
  Bookmark,
  Like,
  Comment,
  Follower,
  Chat,
  Message
}
