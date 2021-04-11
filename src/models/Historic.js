const { Model, DataTypes } = require("sequelize");

class Historic extends Model {
  static init(sequelize) {
    super.init(
      {
        full_name: DataTypes.STRING,
        specialty: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Report, { foreignKey: 'report_id', as: 'HistoricOf' });
  }
}

module.exports = Historic;
