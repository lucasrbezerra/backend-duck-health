const User = require("../models/User");
const Report = require("../models/Report");

module.exports = {
  async index(req, res) {
    const patients = await User.findAll({ where: { user_class: "patient" } });
    return res.json(patients);
  },

  async store(req, res) {
    const { full_name, login, hashed_password } = req.body;

    const user_class = "patient";

    const patient = await User.create({
      full_name,
      login,
      hashed_password,
      user_class,
    });

    return res.json(patient);
  },
};
