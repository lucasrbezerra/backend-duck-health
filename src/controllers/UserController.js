const User = require("../models/User");

module.exports = {
  async index(req, res) {
    const users = await User.findAll();
    return res.json(users);
  },
};
