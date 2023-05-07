const mongoose = require("mongoose");
const gameSchema = mongoose.Schema({
  title: String,
  year: Number,
  rate: Number,
  price: Number,
  minPlayers: Number,
  maxPlayers: Number,
  minAge: Number,
  designers: [String],
});
