const Movie = require("../models/movie_model");
const Category = require("../models/category_model");

const getAllMovies = async (req, res, next) => {
  Movie.find({ isDeleted: false }, function (err, docs) {
    if (err) console.log(err);
    else {
      // res.status(200).send(docs);
      res.status(200).render("homePage.ejs", {
        movieList: docs,
      });
    }
  });
};

const getMovieById = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const movie = await Movie.findById(req.params.id);

    res.render("detailsMovie.ejs", { movie: movie });
  } catch (err) {
    console.log(err);
    // res.status(400).send({
    //   status: "fail",
    //   error: err.message,
    // });
  }
};

const addMovie = async (req, res, next) => {
  var title = req.body.title;
  var description = req.body.description;
  var year = req.body.year;
  var url = req.body.url;
  var category = req.body.category;

  const movie = await Movie({
    title: title,
    description: description,
    year: year,
    url: url,
    category: category,
  });

  const findCategory = await Category.findOne({ name: category });
  findCategory.save(async (error) => {
    if (error) {
      res.status(400).send({
        status: "fail",
        error: error.message,
      });
    } else {
      await Category.updateOne(
        { name: category },
        {
          $push: { movies: [movie._id] },
        }
      );
    }
  });

  await movie.save((error) => {
    if (error) {
      res.status(400).send({
        status: "fail",
        error: error.message,
      });
    } else {
      Movie.find({}, function (err, docs) {
        if (err) console.log(err);
        else {
          res.redirect("/");
        }
      });
    }
  });
};

const editMovie = async (req, res, next) => {
  try {
    const exists = await Movie.updateOne(
      { _id: req.params.id },
      {
        title: req.body.title,
        description: req.body.description,
        year: req.body.year,
        url: req.body.url,
        category: req.body.category,
      }
    );
    const updateMovie = await Movie.findById(req.params.id);
    if (exists == null) return sendError(res, 400, "movie does not exist");
    else {
      console.log("INSIDE EDIT MOVIE!!!! - add redirected page");

      res.redirect(`/detailsMovie/${updateMovie._id}`);
      // res.status(200).send({
      //   status: "OK",
      //   _id: updateMovie._id,
      // });
    }
  } catch (err) {
    res.status(400).send({
      status: "fail",
      error: err.message,
    });
  }
};

const addPopularity = async (req, res) => {
  try {
    console.log("inside popular");
    const movie = await Movie.findById(req.params.id).updateOne(
      { _id: req.params.id },
      { $inc: { counterPopular: 1 } }
    );
    console.log(movie);

    res.status(200).redirect("/");
  } catch (err) {
    console.log(err);
    // res.status(400).send({
    //   status: "fail",
    //   error: err.message,
    // });
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    // const exists = await Post.deleteOne({ _id: req.params.id });
    const exists = await Movie.updateOne(
      { _id: req.params.id },
      { isDeleted: true }
    );

    const updateMovie = await Movie.findById(req.params.id);
    if (exists == null) return sendError(res, 400, "post does not exist");
    else {
      const findCategory = await Category.findOne({
        name: updateMovie.category,
      });
      findCategory.save(async (error) => {
        if (error) {
          res.status(400).send({
            status: "fail",
            error: error.message,
          });
        } else {
          await Category.updateOne(
            { name: updateMovie.category },
            {
              $pull: { movies: req.params.id },
            }
          );
        }
      });

      // res.status(200).send({
      //   status: "OK",
      //   movie: updateMovie,
      // });
      res.redirect("/");
    }
  } catch (err) {
    res.status(400).send({
      status: "fail",
      error: err.message,
    });
  }
};

module.exports = {
  getAllMovies,
  addMovie,
  editMovie,
  getMovieById,
  addPopularity,
  deleteMovie,
};
