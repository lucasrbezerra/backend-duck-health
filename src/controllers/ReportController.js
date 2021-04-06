const User = require("../models/User");
const Report = require("../models/Report");

module.exports = {
  async index(req, res) {
    const reports = await Report.findAll();
    return res.json(reports);
  },

  async store(req, res) {
    const { doctor_id, patient_id } = req.params;
    const { title, date_exam, link } = req.body;

    const patient = User.findByPk(patient_id);
    const doctor = User.findByPk(doctor_id);

    if (!patient || !doctor) {
      res.status(400).json({ error: "Patient or Doctor not found. " });
    }

    const report = await Report.create({
      title,
      date_exam,
      link,
      doctor_id,
      patient_id,
    });

    return res.json(report);
  },
};
