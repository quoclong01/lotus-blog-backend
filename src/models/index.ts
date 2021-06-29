import { Like } from './Like';
import { Comment } from './Comment';
import { User } from './User';
import { Auth } from './Auth';
import { Bookmark } from './Bookmark';
import { Post } from './Post';


Auth.belongsTo(User, { targetKey: 'id', foreignKey: 'userId', as: 'user'});
Post.belongsTo(User, { targetKey: 'id', foreignKey: 'userId', as: 'user'});
Bookmark.belongsTo(User, { targetKey: 'id', foreignKey: 'userId', as: 'user'});
Bookmark.belongsTo(Post, { targetKey: 'id', foreignKey: 'postId', as: 'post'});
Like.belongsTo(User, { targetKey: 'id', foreignKey: 'userId', as: 'user'});
Like.belongsTo(Post, { targetKey: 'id', foreignKey: 'postId', as: 'post'});
Comment.belongsTo(User, { targetKey: 'id', foreignKey: 'userId', as: 'user'});
Comment.belongsTo(Post, { targetKey: 'id', foreignKey: 'postId', as: 'post'});

User.hasMany(Post, { sourceKey: 'id', foreignKey: 'userId' });

export {
  User,
  Post,
  Auth,
  Bookmark,
  Like,
  Comment
}
