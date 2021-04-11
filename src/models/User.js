const { Model, DataTypes } = require("sequelize");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        full_name: DataTypes.STRING,
        specialty: DataTypes.STRING,
        login: DataTypes.STRING,
        hashed_password: DataTypes.STRING,
        user_class: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }
  static associate(models) {
    this.hasMany(models.Report, { foreignKey: 'patient_id', as: 'reportsReceived'});
    this.hasMany(models.Report, { foreignKey: 'doctor_id', as: 'reportsSend'});
  }
}

module.exports = User;
