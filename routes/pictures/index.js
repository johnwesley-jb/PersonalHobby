const express = require("express");
const router = express.Router();

const pictureController = require("../../controller/picture");

router
  .route("/")
  .get(pictureController.getAllPictures)
  .post(pictureController.savePicture);

router
  .route("/:id")
  .get(pictureController.getPictureById)
  .delete(pictureController.deletePicture)
  .put(pictureController.updatePicture)
  .patch(pictureController.partialUpdatePicture);

module.exports = router;
