import { DataTypes, Model, Optional } from 'sequelize';
import db from '../config/database';

interface BookmarkAttributes {
  id: number;
  userId: number;
  postId: number;
}

interface BookmarkCreationAttributes extends Optional<BookmarkAttributes, 'id'> { }

export class Bookmark extends Model<BookmarkAttributes, BookmarkCreationAttributes> implements BookmarkAttributes, BookmarkCreationAttributes {
  public id!: number;
  public userId!: number;
  public postId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Bookmark.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: { model: 'Users', key: 'id' }
  },
  postId: {
    type: DataTypes.INTEGER,
    references: { model: 'Posts', key: 'id' }
  },
}, {
  sequelize: db.sequelize,
  tableName: 'Bookmarks'
});
