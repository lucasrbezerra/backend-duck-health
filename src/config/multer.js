const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();

app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join("src", "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });


module.exports = { upload };
