const express = require("express");
const router = express.Router();
const Movie = require("../controllers/movies");
const MovieModel = require("../models/movie_model");

router.get("/", Movie.getAllMovies); //allMovies

router.get("/addMovie", (req, res) => {
  res.render("movies/addMovie.ejs");
});

router.get("/editMovie/:id", async (req, res) => {
  const movie = await MovieModel.findById(req.params.id);
  res.render("movies/editMovie.ejs", { movie: movie });
});

router.get("/detailsMovie/:id", async (req, res) => {
  const movie = await MovieModel.findById(req.params.id);
  res.render("movies/detailsMovie.ejs", { movie: movie });
});

router.get("/allMovies", async (req, res) => {
  const movies = await MovieModel.find();
  res.render("movies/allMovies.ejs", { movieList: movies });
});

router.post("/addMovie", Movie.addMovie);

router.post("/editMovie/:id", Movie.editMovie);

router.post("/detailsMovie/:id", Movie.getMovieById);

router.post("/counterPopular/:id", Movie.addPopularity);

module.exports = router;
