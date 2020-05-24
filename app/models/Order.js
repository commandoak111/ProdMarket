const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define schema

let Order = new Schema(
  {
    items: [],
    totalqty: Number,
    amount: Number,
    name: String,
    mobile: Number,
    email: String,
    address: String,
    country: String,
    zipcode: Number,
    city: String,
    state: String,
    status:String
  },
  {
    collection: "Order",
  }
);

module.exports = mongoose.model("Order", Order);
