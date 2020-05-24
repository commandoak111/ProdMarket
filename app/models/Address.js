const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define schema

let Address = new Schema(
  {
    name: String,
    mobile: Number,
    email: String,
    address: String,
    country: String,
    zipcode: Number,
    city: String,
    state: String,
  },
  {
    collection: "Address",
  }
);

module.exports = mongoose.model("Address", Address);
