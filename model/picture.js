const mongoose = require("mongoose");

const pictureSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  imageDate: { type: Date, required: true },
  category: { type: String, enum: categories },
  //   photographer: {
  //     name: {
  //       type: String,
  //       required: true,
  //     },
  //     address: String,
  //     phoneNumber: String,
  //     email: {
  //       type: String,
  //       required: true,
  //     },
  //   },
});

const categories = [
  "Landscape",
  "Nature",
  "Portrait",
  "Street",
  "Architectural",
  "Sports",
  "Travel",
  "Food",
  "Wedding",
  "Product",
];

const Picture = mongoose.model("Picture", pictureSchema);

module.exports = Picture;
