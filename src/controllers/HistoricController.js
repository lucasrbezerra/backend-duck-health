const Historic = require("../models/Historic");
const Report = require("../models/Report");

module.exports = {
  async index(req, res) {
    const historics = await Historic.findAll();

    return res.json(historics);
  },

  async store(req, res) {
    const { report_id } = req.params;

    const report = Report.findById(report_id);

    if (!report) {
      return res.status(400).json({ error: "Not Found" });
    }

    const historic = await Historic.create({
      full_name: report.full_name,
      specialty: report.specialty,
      report_id,
    });

    return res.json(historic);
  },
};
