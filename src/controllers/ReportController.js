const User = require("../models/User");
const Report = require("../models/Report");
const Historic = require("../models/Historic");
const path = require("path");

module.exports = {
  async index(req, res) {
    const reports = await Report.findAll();
    if (!reports) {
      res.status(400).json({ error: "Reports not found!" });
    }
    return res.json(reports);
  },

  async store(req, res) {
    const { doctor_id, patient_id } = req.params;
    const { title, date_exam } = req.body;
    const file = req.file;

    const patient = await User.findByPk(patient_id);
    const doctor = await User.findByPk(doctor_id);

    if (!patient || !doctor) {
      res.status(400).json({ error: "Patient or Doctor not found!" });
    }

    const link = `${file.filename}`;

    try {
      const report = await Report.create({
        title,
        date_exam,
        link,
        doctor_id,
        patient_id,
      });

      await Historic.create({
        full_name: doctor.full_name,
        specialty: doctor.specialty,
        report_id: report.dataValues.id,
      });

      return res.json(report);
    } catch (e) {
      console.log(e);
    }
  },

  async delete(req, res) {
    const { report_id } = req.params;

    const report = await Report.findByPk(report_id);

    if (report) {
      await report.destroy();
    } else {
      return res.status(400).send({ Error: "Report not found!" });
    }

    return res.json({ Sucessefully: `report_id ${report.id} destroied!` });
  },

  download(req, res) {
    const uploadFolder = `${path.join("src")}` + `\\uploads\\`;
    let fileName = req.params.filename;
    const filePath = uploadFolder + fileName;
    res.download(filePath, fileName);
  },
};
