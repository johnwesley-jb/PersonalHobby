const express = require("express");
const router = express.Router();

const pictureController = require("../../controller/picture");

router.get("/", pictureController.getAllPictures);
router.get("/:id", pictureController.getPictureById);

module.exports = router;
