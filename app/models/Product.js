const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define schema

let Product = new Schema(
  {
    name: {
      type: String,
    },
    category_id: {
      type: Number,
    },
    subcategoryid: {
      type: Number,
    },
    price: {
      type: Number,
    },
    description: {
      type: String,
    },
    color: {
      type: [],
    },
    size: {
      type: [],
    },
    available: {
      type: Number,
    },
    brand: {
      type: String,
    },
    image:String
  },
  {
    collection: "Product",
  }
);

module.exports = mongoose.model("Product", Product);
