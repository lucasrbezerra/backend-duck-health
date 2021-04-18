require("dotenv-safe").config();
const jwt = require("jsonwebtoken");
const blacklist = [];

module.exports = {
  verifyJWT(req, res, next) {
    try {
      const token = req.headers["x-access-token"];

      const index = blacklist.findIndex((item) => item === token);
      if (index !== -1) return res.status(401).end();

      const decode = jwt.verify(token, process.env.SECRET);

      req.id = decode.id;

      next();
    } catch (error) {
      return res.status(401).send({ error: "Falha na Autenticação" });
    }
  },

  async logout(req, res) {
    blacklist.push(req.headers["x-access-token"]);
    res.end();
  },

  authRole(user_class) {
    return (req, res, next) => {
      try {
        const token = req.headers["x-access-token"];

        const decode = jwt.verify(token, process.env.SECRET);

        if (decode.user_class !== user_class) return res.status(401).end();

        next();
      } catch (error) {
        console.log(error);
      }
    };
  },

  authRoleMixed(user_class1, user_class2) {
    return (req, res, next) => {
      try {
        const token = req.headers["x-access-token"];

        const decode = jwt.verify(token, process.env.SECRET);

        if (
          decode.user_class !== user_class1 &&
          decode.user_class !== user_class2
        )
          return res.status(401).end();

        next();
      } catch (error) {
        console.log(error);
      }
    };
  },
};
