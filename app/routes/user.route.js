const express = require("express");
const app = express();
const userRoutes = express.Router();
const Path = require("path");
const jwt = require("jsonwebtoken");
const multer = require("multer");

// Require order model on route modal
let User = require("../models/User");

userRoutes.route("/token").post(function (req, res, next) {
  let username = req.body.username;
  let password = req.body.password;
  User.findOne({ username, password }, function (err, user) {
    if (user) {
      const token = jwt.sign(
        { username: req.body.username, password: req.body.password },
        "RANDOM_SECRET_TOKEN",
        {
          expiresIn: "24h",
        }
      );

      user.username = req.body.username;
      user.password = req.body.password;
      user.token = token;

      user.save().then((user) => {
        res.status(200).json({
          username: user.username,
          password: user.password,
          token: user.token,
        });
      });
    } else {
      res.status(401).send("User name or password is incorrect");
    }
  });
});

module.exports = userRoutes;
