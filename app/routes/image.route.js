const express = require("express");
const app = express();
const imageRoutes = express.Router();
const Path = require("path");
const multer = require("multer");

// Require order model on route modal
let Image = require("../models/Images");

var store = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    var originalname = file.originalname.split(".");
    var len = originalname.length;
    cb(null, Date.now() + "." + originalname[len - 1]);
  },
});

var upload = multer({ storage: store }).single("image");

imageRoutes.route("/upload").post(function (req, res, next) {
  upload(req, res, function (err) {
    if (err) {
      return res.status(501).json({ error: err });
    }
    var id = req.file.filename.split(".");
    var data = {
      filename: req.file.filename,
      id: id[0],
    };
    let image = new Image(data);
    image.save().then((image) => {
      res.status(200).json({
        uploadname: image.filename,
        id: image.id,
      });
    });
  });
});

imageRoutes.route("/show/:id").get(function (req, res, next) {
  let id = req.params.id;
  Image.findOne({ id }, function (err, image) {
    var filepath = Path.join(__dirname, "../../uploads/" + image.filename);
    res.sendFile(filepath);
  });
});

module.exports = imageRoutes;
