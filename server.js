const express = require("express");
const cors = require("cors");
const http = require("http");
const Path = require("path");
// const path = Path.resolve(__dirname,"./uploads")
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");
const server = http.createServer(app);
const port = process.env.PORT || 9000 
app.use(express.static(__dirname + "/dist/Learningv1"));

// Router
const productRouter = require("./app/routes/product.route");
const orderRouter = require("./app/routes/order.route");
const addressRouter = require("./app/routes/address.route");
const imageRouter = require("./app/routes/image.route");
// Connect database
const mongoose = require("mongoose");
const config = require("./DB");
mongoose.Promise = global.Promise;
mongoose
  .connect(config.DB, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(
    () => {
      console.log(`database is connected ${port}`);
    },
    (err) => {
      console.log("cannot connect to the database" + err);
    }
  );

const jwt = require("jsonwebtoken");
const secret = "secret";
const fs = require("fs");
const lodash = require("lodash");
app.use(cors());
app.use(bodyParser.json());

app.use("/market/product", productRouter);
app.use("/market/order", orderRouter);
app.use("/market/address", addressRouter);
app.use("/market/image",imageRouter)

server.listen(port);


// multer sample
// var store = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads");
//   },
//   filename: function (req, file, cb) {
//     var originalname = file.originalname.split(".");
//     var len = originalname.length;
//     cb(null, Date.now() + "." + originalname[len - 1]);
//   },
// });

// var upload = multer({ storage: store }).single("image");

// app.post("/market/upload", function (req, res, next) {
//   upload(req, res, function (err) {
//     if (err) {
//       return res.status(501).json({ error: err });
//     }
//     return res.json({
//       originalname: req.file.originalname,
//       uploadname: req.file.filename,
//     });
//   });
// });

// app.get("/market/show/:id", function (req, res, next) {

//   var filepath = Path.join(__dirname, "./uploads/" + req.params.id);
//   res.sendFile(filepath);
// });

// let upload = multer({ dest: "uploads" });

// app.post(
//   "/market/image/uploadimage",
//   upload.single("image"),
//   (req, res, next) => {
//     const file = req.file;
//     console.log("image upload in server  ", file);
//     if (!file) {
//       const error = new Error("please upload a file");
//       res.status(400).send(error);
//     } else {
//       res.status(200).send(file);
//     }
//   }
// );

// end of upload

// app.get('/uploads',(req,res)=>{
//   res.sendFile(__dirname,"./uploads")
// })
// app.get("/uploads", function (req, res) {
//   const Path = require("path");
//   const path = Path.resolve(
//     __dirname,
//     "./uploads/",
//     "b4748a65e0ae1419d1837cb76846566e"
//   );
//   console.log("image uploaded directory  ", path);
//   res.status(200).send(path);
// });



