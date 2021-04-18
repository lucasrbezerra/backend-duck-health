const User = require("../models/User");
const bcrypt = require("bcrypt");
require("dotenv-safe").config();
const jwt = require("jsonwebtoken");

module.exports = {
  async login(req, res) {
    const { login, password } = req.body;

    const user = await User.findAll({
      where: { login },
    });

    if (user.length === 0) {
      return res.status(401).json({ auth: false, error: "User not found!" });
    } else if (
      !(await bcrypt.compare(password, user[0].dataValues.hashed_password))
    ) {
      return res.status(401).json({ auth: false, error: "Invalid Passoword!" });
    }

    const { id, full_name, user_class } = user[0].dataValues;

    const token = jwt.sign({ id, full_name, user_class }, process.env.SECRET, {
      expiresIn: 86400, // expires in 5min
    });

    return res.json({
      id,
      full_name,
      user_class,
      auth: true,
      token: token,
    });
  },
};
