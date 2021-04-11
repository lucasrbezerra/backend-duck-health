const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');
const Report = require('../models/Report');
const Historic = require('../models/Historic')

const connection = new Sequelize(dbConfig);

User.init(connection);
Report.init(connection);
Historic.init(connection);

User.associate(connection.models);
Report.associate(connection.models);
Historic.associate(connection.models);

module.exports = connection;