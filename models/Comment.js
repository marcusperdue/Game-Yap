// models/Comment.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comment_text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
  },
  {
    sequelize,
    modelName: 'comment',
    underscored: true,
    freezeTableName: true,
  }
);

module.exports = Comment;
