const { Model, DataTypes } = require("sequelize");

class Report extends Model {
  static init(sequelize) {
    super.init(
      {
        title: DataTypes.STRING,
        date_exam: DataTypes.DATE,
        link: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: "patient_id",
      as: "patientOwner",
    });
    this.belongsTo(models.User, { foreignKey: "doctor_id", as: "doctorOwner" });
    this.hasOne(models.Historic, { foreignKey: "report_id", as: "hasOne" });
  }
}

module.exports = Report;
