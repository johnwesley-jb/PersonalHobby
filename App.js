const express = require("express");
const app = express();
const path = require("path");
const router = require("./routes");
require("dotenv").config();
require("./connection.js");
app.use(express.json());
app.use(express.urlencoded({ extented: false }));

app.listen(process.env.EXPRESS_PORT, () => {
  console.log("server running");
});

app.use("/", router);
