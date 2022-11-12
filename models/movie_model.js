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
  // geners: {
  //   type: [String],
  //   require: false,
  // },
});

module.exports = mongoose.model("Movie", movieSchema);
