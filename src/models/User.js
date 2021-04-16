const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        full_name: DataTypes.STRING,
        specialty: DataTypes.STRING,
        login: DataTypes.STRING,
        hashed_password: {
          type: DataTypes.STRING,
            set(value) {
            console.log("password of ======>:", value);
            const hash = bcrypt.hashSync(value, 8);
            this.setDataValue("hashed_password", hash);
          },
        },
        user_class: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }
  static associate(models) {
    this.hasMany(models.Report, {
      foreignKey: "patient_id",
      as: "reportsReceived",
    });
    this.hasMany(models.Report, { foreignKey: "doctor_id", as: "reportsSend" });
  }
}

module.exports = User;
