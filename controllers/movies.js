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
      res.status(200).send({
        status: "OK",
        _id: movie._id,
      });
    }
  });
};

module.exports = {
  getAllMovies,
  addMovie,
};
