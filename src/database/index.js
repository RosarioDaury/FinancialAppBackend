const { Sequelize } = require('sequelize');
const mysqlConnection = require('./config.js');

const dbConnection = new Sequelize(mysqlConnection);


module.exports = {
    dbConnection
}