const express = require("express");
const app = express();
const addressRoutes = express.Router();

// Require address model on route modal
let Address = require("../models/Address");
addressRoutes.route("/createaddress").post(function (req, res) {
  console.log("Address Router : body  :  ", req.body);

  let address = new Address(req.body);

  address
    .save()
    .then((address) => {
      res
        .status(200)
        .json({ Address: "Address has been added successfully", address });
    })
    .catch((err) => {
      res.status(400).send("unable to save to database");
    });
});
// Defined get data(index or listing) route
addressRoutes.route("/getorder").get(function (req, res) {
  Address.find(function (err, addresses) {
    if (err) {
      console.log(err);
    } else {
      res.json(addresses);
    }
  });
});
// Defined edit route
addressRoutes.route("/editorder/:id").get(function (req, res) {
  let id = req.params.id;
  Address.findById(id, function (err, address) {
    res.json(address);
  });
});
//  Defined update route
addressRoutes.route("/updateorder/:id").post(function (req, res) {
  Address.findById(req.params.id, function (err, address) {
    if (!address) res.status(404).send("Record not found");
    else {
      address.ProductName = req.body.ProductName;
      address.ProductDescription = req.body.ProductDescription;
      address.ProductPrice = req.body.ProductPrice;
      address
        .save()
        .then((address) => {
          res.json("Update complete");
        })
        .catch((err) => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});
// Defined delete | remove | destroy route
addressRoutes.route("/deleteorder/:id").get(function (req, res) {
  Address.findByIdAndRemove({ _id: req.params.id }, function (err, address) {
    if (err) res.json(err);
    else res.json("Successfully removed");
  });
});
module.exports = addressRoutes;
