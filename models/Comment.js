const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {
 static async postComment(commentText, gameId, userId) {
    return await Comment.create({
      text: commentText,
      gameId: gameId,
      userId: userId,
    });
 }
}

Comment.init(
 {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gameId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Game',
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
      },
    },
 },
 {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'Comment',
 }
);

module.exports = Comment;