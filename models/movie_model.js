const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    default: true,
  },
  url: {
    type: String,
    default: true,
  },
  category: {
    type: String,
    require: true,
  },
  Date: {
    type: Date,
    default: Date.now,
  },
  counterPopular: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Movie", movieSchema);
