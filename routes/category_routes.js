const CategoryModel = require("../models/category_model");
const MovieModel = require("../models/movie_model");
const express = require("express");
const router = express.Router();

// const Category = require("../Controllers/categories");

// router.get("/:id", Category.getMoviesByCategoryName);

router.get("/allCategories", async (req, res) => {
  const movies = await MovieModel.find({});
  res.render("./categories/allCategories.ejs", { movieList: movies });
});

// router.post("/allCategories", async (req, res) => {
//   const movies = await CategoryModel.find();
//   res.render("allCategories.ejs", { movieList: movies });
// });

module.exports = router;
