const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define schema

let User = new Schema(
  {
    username: String,
    password: String,
    token: String,
  },
  {
    collection: "User",
  }
);

module.exports = mongoose.model("User", User);
