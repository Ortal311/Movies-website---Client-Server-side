const express = require("express");
const router = express.Router();
const Movie = require("../controllers/movies");
const MovieModel = require("../models/movie_model");

router.get("/", Movie.getAllMovies); //allMovies

router.get("/addMovie", (req, res) => {
  res.render("movies/addMovie.ejs");
});

router.post("/add", Movie.addMovie);

module.exports = router;
