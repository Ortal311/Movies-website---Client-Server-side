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

router.get("/detailsMovie/:id", async (req, res) => {
  const movie = await MovieModel.findById(req.params.id);
  res.render("movies/detailsMovie.ejs", { movie: movie });
});

router.post("/addMovie", Movie.addMovie);

router.post("/editMovie/:id", Movie.editMovie);

router.post("/detailsMovie/:id", Movie.getMovieById);

module.exports = router;
