const User = require("../models/User");
const Report = require("../models/Report");
const bcrypt = require("bcrypt");

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

  async edit(req, res) {
    const { patient_id } = req.params;
    const { full_name, login, hashed_password } = req.body;

    const patient = await User.findByPk(patient_id);

    if (!patient) {
      return res.status(400).json({ error: "User not found!" });
    }

    patient.full_name = full_name;
    patient.login = login;
    patient.hashed_password = hashed_password;

    const patientEdited = await patient.save();

    return res.json(patientEdited);
  },

  async delete(req, res) {
    const { patient_id } = req.params;

    const patient = await User.findByPk(patient_id);
    if (patient) {
      await patient.destroy();
    } else {
      return res.status(400).send({ Error: "User not found!" });
    }

    return res.json({ Sucessefully: `doctor_id ${patient_id} destroied!` });
  },
};
