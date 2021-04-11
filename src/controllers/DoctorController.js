const User = require("../models/User");
const Report = require("../models/Report");

module.exports = {
  async index(req, res) {
    const doctors = await User.findAll({ where: { user_class: "doctor" } });
    return res.json(doctors);
  },

  async store(req, res) {
    const { full_name, specialty, login, hashed_password } = req.body;

    const user_class = "doctor";

    const doctor = await User.create({
      full_name,
      specialty,
      login,
      hashed_password,
      user_class,
    });

    return res.json(doctor);
  },

  async delete(req, res) {
    const { doctor_id } = req.params;

    const Doctor = await User.findByPk(doctor_id);
    if (Doctor) {
      await Doctor.destroy();
    } else {
      return res.status(400).send({ Error: "User not found!" });
    }

    return res.json({ Sucessefully: `doctor_id ${doctor_id} destroied!` });
  },
};
