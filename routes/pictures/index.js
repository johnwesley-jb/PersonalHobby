const express = require("express");
const router = express.Router();

const pictureController = require("../../controller/picture");

router.get("/", pictureController.getAllPictures);
router.post("/", pictureController.savePicture);
router.get("/:id", pictureController.getPictureById);
router.delete("/:id", pictureController.deletePicture);
router.put("/:id", pictureController.updatePicture);

router.patch("/:id", pictureController.partialUpdatePicture);

module.exports = router;
