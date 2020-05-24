const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define schema

let Categories = new Schema(
  {
    subgroups: [],
    icon: String,
    key: String,
    name: String,
  },
  {
    collection: "Categories",
  }
);

module.exports = mongoose.model("Categories", Categories);
