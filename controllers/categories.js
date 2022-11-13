// const Movie = require("../Models/movie_model");
const Category = require("../Models/category_model");

const router = require("../Routes/category_routes");

Category.countDocuments({}, function (err, count) {
  // decide ur other logic

  // if count is 0 or less
  if (count <= 0) {
    var categoryDrama = {
      name: "Drama",
    };
    var categoryRomance = {
      name: "Romance",
    };
    var categoryAction = {
      name: "Action",
    };
    var categoryComedy = {
      name: "Comedy",
    };

    Category.create(categoryDrama, function (e) {
      if (e) {
        throw e;
      }
    });
    Category.create(categoryRomance, function (e) {
      if (e) {
        throw e;
      }
    });
    Category.create(categoryAction, function (e) {
      if (e) {
        throw e;
      }
    });
    Category.create(categoryComedy, function (e) {
      if (e) {
        throw e;
      }
    });
  }
});

const getMoviesByCategoryName = async (req, res, next) => {
  try {
    const movies = await Category.findById(req.params.name);
    res.status(200).send(movies);
  } catch (err) {
    res.status(400).send({
      status: "fail",
      error: err.message,
    });
  }
};

module.exports = {
  getMoviesByCategoryName,
};
