const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define schema

let Images = new Schema(
  {
    filename: String,
    id: String,
  },
  {
    collection: "Images",
  }
);

module.exports = mongoose.model("Images", Images);
