const User = require("../models/User");

module.exports = {
  async index(req, res) {
    const admins = await User.findAll({ where: { user_class: "admin" } });
    return res.json(admins);
  },

  async store(req, res) {
    const { full_name, login, hashed_password } = req.body;

    const user_class = "admin";

    const admin = await User.create({
      full_name,
      login,
      hashed_password,
      user_class,
    });

    return res.json(admin);
  },
};
