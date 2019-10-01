/**** imports *****/

require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const app = express();

/**** routers *****/

const indexRouter = require("./routes/index");
const moviesRouter = require("./routes/movies");
const categoriesRouter = require("./routes/categories");
const authRouter = require("./routes/auth");

const port = process.env.PORT || 3001;
const version = process.env.VERSION;

/**** modules use *****/
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use("/public", express.static("public"));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/public", express.static("public"));
app.use("/", indexRouter);
app.use(`${version}/movies`, moviesRouter);
app.use(`${version}/categories`, categoriesRouter);
app.use(`${version}/auth`, authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

//Lance serveur node
app.listen(port, err => {
  if (err) {
    throw new Error("Connection impossible");
  }
  console.log(`Server is listening on ${port}`);
});

module.exports = app;
