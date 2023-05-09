const express = require("express");
const cors = require("cors");
const bearerToken = require("express-bearer-token");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3001;
require("dotenv").config();
const path = require("path");
const getError = require("./utils");

const db = process.env.MONGO_URI;

const routes = require("./api/routes");

// Connection
mongoose.Promise = global.Promise;
mongoose
  .connect(db)
  .then((res) => console.log("connected"))
  .catch((err) => console.log(err));

// Parse application data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(bearerToken());

app.use(
  "/api/uploads/articles",
  express.static(__dirname + "/api/uploads/articles")
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Authorization, X-Requested-With, Content-Type, Accept, x-auth-token, x-response-control, X-Auth-Token"
  );
  res.header("Content-Length", 0);
  res.header("Content-Type", "text/plain");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(routes);

// Server
app.listen(port);
console.debug(`Server is listening on port ${port}`);

app.route("/").get(function (req, res) {
  res.send("hello world");
});
