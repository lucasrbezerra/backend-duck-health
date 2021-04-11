const User = require("../models/User");

module.exports = {
  async index(req, res) {
    const users = await User.findAll();
    return res.json(users);
  },

  async listLogins(req, res) {
    const users = await User.findAll({
      attributes: ['login']
    });

    return res.send(users);
  },
};
