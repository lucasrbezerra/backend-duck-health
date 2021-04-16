const User = require("../models/User");
const Report = require("../models/Report");
const bcrypt = require("bcrypt");


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
      user_class
    });

    return res.json(doctor);
  },

  async edit(req, res) {
    const { doctor_id } = req.params;
    const { full_name, login, specialty, hashed_password } = req.body;

    const doctor = await User.findByPk(doctor_id);

    if(!doctor){
      return res.status(400).json({ error: "User not found!"});
    }

    doctor.full_name = full_name;
    doctor.login = login;
    doctor.specialty = specialty;
    doctor.hashed_password = hashed_password;

    const doctorEdited = await doctor.save();

    return res.json(doctorEdited);
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
