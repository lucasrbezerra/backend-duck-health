const User = require("../models/User");
const Report = require("../models/Report");
const { QueryTypes } = require("sequelize");
const sequelize = require("../database/index");

module.exports = {
  /* Busque todos os laudos de um determinado paciente  */
  async queryReports(req, res) {
    const { patient_id } = req.params;

    const user = await User.findByPk(patient_id);

    if (!user) {
      return res.status(400).json({ error: "Patient not found!" });
    }

    const reports = await Report.findAll({
      where: { patient_id },
      include: [
        { association: "doctorOwner", attributes: ["full_name", "specialty"] },
        { association: "patientOwner", attributes: ["full_name"]},
      ],
    });

    return res.json(reports);
  },

  async queryPatient(req, res) {
    const { patient_id } = req.params;

    const user = await User.findByPk(patient_id);

    if(!user) {
      return res.status(400).json({ error: "Patient not"});
    }

    const { full_name } = user;

    return res.json(full_name);
  },

  /* Busque todos os pacientes que um médico já enviou um laudo */
  /*
  async queryMyPatients(req, res) {
    const { doctor_id } = req.params;

    const user = await User.findByPk(doctor_id);

    if (!user) {
      return res.status(400).json({ error: "Doctor not found!" });
    }

    const patients = await User.findAll({
      attributes: ["full_name", "login"],
      include: [{ association: "reportsReceived", where: { doctor_id } }],
    });

    return res.json(patients);
  },
  */
  async queryMyPatients(req, res) {
    const { doctor_id } = req.params;

    const user = await User.findByPk(doctor_id);

    if (!user) {
      return res.status(400).json({ error: "Doctor not found!" });
    }

    const patients = await sequelize.query(
      `
      SELECT DISTINCT pat.id, pat.full_name, pat.login FROM reports r
      JOIN users doc
      ON doc.id = r.doctor_id
      JOIN users pat 
      ON pat.id = r.patient_id
      WHERE r.doctor_id = ${doctor_id}
      `,
      {
        type: QueryTypes.SELECT,
      }
    );

    return res.json(patients);
  },
};
