const express = require("express");
const app = express();
const userRoutes = express.Router();
const Path = require("path");
const jwt = require("jsonwebtoken");
const multer = require("multer");

// Require order model on route modal
let User = require("../models/User");

userRoutes.route("/token").post(function (req, res, next) {
  const token = jwt.sign(
    { username: req.body.username, password: req.body.password },
    "RANDOM_SECRET_TOKEN",
    {
      expiresIn: "24h",
    }
  );

  let data = {
    username: req.body.username,
    password: req.body.password,
    token: token,
  };
  let user = new User(data);
  user.save().then((user) => {
    res.status(200).json({
      username: user.username,
      password: user.password,
      token: user.token,
    });
  });
});

module.exports = userRoutes;
