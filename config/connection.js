/*
  Simple Node.js code for setting up a Sequelize database connection.
  This code checks for the presence of a JAWSDB_URL environment variable,
  which is used in production, and falls back to local database settings
  if the environment variable is not defined.
*/

const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
   
    sequelize = new Sequelize(process.env.JAWSDB_URL);
  } else {
    
    sequelize = new Sequelize(
        process.env.DB_NAME, 
        process.env.DB_USER, 
        process.env.DB_PASSWORD, {
            host: 'localhost',
            dialect: 'mysql',
            port: 3306  
        }
    );
}

module.exports = sequelize;