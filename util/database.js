const Sequelize = require('sequelize');

const sequelize = new Sequelize('automart', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
  });

  module.exports = sequelize;