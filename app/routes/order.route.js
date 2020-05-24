const express = require("express");
const app = express();
const orderRoutes = express.Router();

// Require order model on route modal
let Order = require("../models/Order");
orderRoutes.route("/createorder").post(function (req, res) {
  console.log("Order Router : body  :  ", req.body);

  let order = new Order(req.body);

  order
    .save()
    .then((order) => {
      res
        .status(200)
        .json({ Order: "Order has been added successfully", order });
    })
    .catch((err) => {
      res.status(400).send("unable to save to database");
    });
});
// Defined get data(index or listing) route
orderRoutes.route("/getorder").get(function (req, res) {
  Order.find(function (err, orders) {
    if (err) {
      console.log(err);
    } else {
      res.json(orders);
    }
  });
});
// Defined edit route
orderRoutes.route("/editorder/:id").get(function (req, res) {
  let id = req.params.id;
  Order.findById(id, function (err, order) {
    res.json(order.items);
  });
});
//  Defined update route
orderRoutes.route("/updateorder/:id").post(function (req, res) {
  console.log("Order Router : body  :  ", req.body,req.params.id);

  Order.findById(req.params.id, function (err, order) {
    if (!order) res.status(404).send("Record not found");
    else {
      order.status = req.body.status;
      order
        .save()
        .then((order) => {
          res.status(200).send(order);
        })
        .catch((err) => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});
// Defined delete | remove | destroy route
orderRoutes.route("/deleteorder/:id").get(function (req, res) {
  Order.findByIdAndRemove({ _id: req.params.id }, function (err, order) {
    if (err) res.json(err);
    else res.json("Successfully removed");
  });
});
module.exports = orderRoutes;
