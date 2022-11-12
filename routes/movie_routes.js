const express = require("express");
const router = express.Router();
const Movie = require("../controllers/movies");
const MovieModel = require("../models/movie_model");

router.get("/", Movie.getAllMovies); //allMovies

router.get("/addMovie", (req, res) => {
  res.render("movies/addMovie.ejs");
});

router.get("/editMovie/:id", (req, res) => {
  res.render("movies/editMovie.ejs", { movieId: req.params.id });
});

router.post("/addMovie", Movie.addMovie);

router.post("/editMovie/:id", Movie.editMovie);

module.exports = router;
