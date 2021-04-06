const User = require("../models/User");
const Report = require("../models/Report");
const { Op } = require("sequelize");

module.exports = {
  async index(req, res) {
    const doctors = await User.findAll({ where: { user_class: "doctor" } });
    return res.json(doctors);
  },

  async store(req, res) {
    const { full_name, login, hashed_password, specialty } = req.body;

    const user_class = "doctor";

    const doctor = await User.create({
      full_name,
      login,
      hashed_password,
      specialty,
      user_class,
    });

    return res.json(doctor);
  },
};
