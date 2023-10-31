const {
    Model,
    DataTypes
} = require('sequelize');
const sequelize = require('../config/connection');

sequelize.sync({ force: false }) // Set force to true to drop and recreate tables (use with caution)
  .then(() => {
    console.log('Database and tables are synchronized.');
  })
  .catch((error) => {
    console.error('Error synchronizing the database:', error);
  }); 
  
class Post extends Model {}

Post.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
        }
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id'
        }
    }
}, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post'
})


module.exports = Post;