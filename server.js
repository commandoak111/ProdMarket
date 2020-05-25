const express = require("express");
const cors = require("cors");
const http = require("http");
const Path = require("path");
const router = express.Router();
// const path = Path.resolve(__dirname,"./uploads")
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");
const server = http.createServer(app);
app.use(express.static(__dirname + "/dist/Learningv1"));
// Authorization middleware
const auth = require("./middleware/auth");

// Router
const productRouter = require("./app/routes/product.route");
const orderRouter = require("./app/routes/order.route");
const addressRouter = require("./app/routes/address.route");
const imageRouter = require("./app/routes/image.route");
const userRouter = require("./app/routes/user.route");

// Connect database
const mongoose = require("mongoose");
const config = require("./DB");
// port
var port = process.env.PORT || 8080;
mongoose.Promise = global.Promise;
mongoose
  .connect(config.DB, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(
    () => {
      console.log("database is connected", port);
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

// Routing
app.use("/market/product", auth, productRouter);
app.use("/market/order", auth, orderRouter);
app.use("/market/address", auth, addressRouter);
app.use("/market/image", imageRouter);
app.use("/market/user", userRouter);

server.listen(port);
