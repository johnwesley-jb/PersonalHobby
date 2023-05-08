const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const pictureSchema = mongoose.Schema({
  title: { type: String },
  description: { type: String },
  imageUrl: { type: String },
  imageDate: { type: Date, required: true },
  photographers: [
    {
      name: { type: String, required: true },
      address: String,
      phoneNumber: String,
      email: { type: String, required: true },
    },
  ],
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
