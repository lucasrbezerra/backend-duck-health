const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');
const Report = require('../models/Report');

const connection = new Sequelize(dbConfig);

User.init(connection);
Report.init(connection);

User.associate(connection.models);
Report.associate(connection.models);

module.exports = connection;