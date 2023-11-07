const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user', // This is the table name that Sequelize will look for
        key: 'id',
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    external_game_id: {
      type: DataTypes.STRING,
      allowNull: true, // Set to false if this should be a required field
    },
  },
  {
    sequelize,
    modelName: 'post',
    underscored: true,
    freezeTableName: true,
  }
);

module.exports = Post;
