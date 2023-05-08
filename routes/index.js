const express = require("express");
const router = express.Router();
const pictureRoute = require("./pictures");

router.use("/pictures", pictureRoute);

module.exports = router;
