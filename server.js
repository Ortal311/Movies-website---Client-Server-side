const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const PORT = 5000;

app.set("view engine", "ejs");

/* Connect to mongo */
mongoose.connect("mongodb://localhost:27017", { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to mongo"));

/* body parser */

app.use(bodyParser.urlencoded({ extended: true, limit: "1mb" }));
app.use(bodyParser.json());

const movieRouter = require("./routes/movie_routes");
const categoryRouter = require("./routes/category_routes");

app.use("/", movieRouter);
app.use("/category", categoryRouter);

app.listen(PORT, () => {
  console.log("app running on port " + PORT);
});

app.use("/public", express.static("public"));

module.exports = app;
