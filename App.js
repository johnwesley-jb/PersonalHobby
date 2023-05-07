const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
require("./connection.js");

app.listen(process.env.EXPRESS_PORT, () => {
  console.log("server running");
});
