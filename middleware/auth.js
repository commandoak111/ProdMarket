const express = require("express");
const jwt = require("jsonwebtoken");
let User = require("../app/models/User");

module.exports = (req, res, next) => {
  try {
    let token = req.headers["authorization"].split(" ")[1];
    User.findOne({ token }, function (err, user) {
      if (user) {
        next();
      } else {
        res.status(401).send("Authorization falied");
      }
    });
  } catch (error) {
    res.status(401).send("Authorization error");
  }
};
