// Assuming this file is named Comment.js and is in a folder called 'models'

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); // Ensure this path is correct to your connection file

class Comment extends Model {
  // If you have any specific methods for the Comment, they would go here
  static async postComment(commentText, rawgGameId, userId) {
    return await Comment.create({
      comment_text: commentText,
      rawgGameId: rawgGameId,
      userId: userId,
    });
  }
}

// Initialize the model's schema
Comment.init({
  // Define the schema
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  comment_text: {
    type: DataTypes.TEXT, // Use TEXT if comments can be lengthy
    allowNull: false,
  },
  rawgGameId: {
    type: DataTypes.BIGINT, // Use BIGINT for large external IDs
    allowNull: true // allowNull is true because not all comments might be associated with a RAWG game
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false, // Assuming a user must be logged in to comment
    references: {
      model: 'users', // Should match the table name for the User model
      key: 'id'
    }
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  // Model options
  sequelize,
  timestamps: true, // If true, Sequelize will expect `createdAt` and `updatedAt` fields
  freezeTableName: true,
  underscored: true,
  modelName: 'comment' // The model will take the name 'comment' in Sequelize
});

module.exports = Comment; // Export the model for use in other files
