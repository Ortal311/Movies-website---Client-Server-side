const Movie = require("../models/movie_model");

const getAllMovies = async (req, res, next) => {
  Movie.find({}, function (err, docs) {
    if (err) console.log(err);
    else {
      // res.status(200).send(docs);
      res.status(200).render("homePage.ejs", { movieList: docs });
    }
  });
};

const addMovie = async (req, res, next) => {
  var title = req.body.title;
  var description = req.body.description;
  var year = req.body.year;
  var url = req.body.url;

  const movie = await Movie({
    title: title,
    description: description,
    year: year,
    url: url,
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
      }
    );
    const updateMovie = await Movie.findById(req.params.id);
    if (exists == null) return sendError(res, 400, "movie does not exist");
    else {
      console.log("INSIDE EDIT MOVIE!!!! - add redirected page");

      res.status(200).send({
        status: "OK",
        _id: updateMovie._id,
      });
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
};
