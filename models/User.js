// models/User.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
  // Method to check if a provided password matches the user's hashed password
  async checkPassword(password) {
    return await bcrypt.compare(password, this.password);
  }
}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1], // Minimum password length
      },
    },
  },
  {
    hooks: {
      // Before creating a new user, hash the password
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
    },
    sequelize,
    modelName: 'user',
    underscored: true,
    freezeTableName: true,
  }
);

module.exports = User;
