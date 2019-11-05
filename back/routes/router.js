/**** Import modules *****/
const router = require("express").Router();
const passport = require("passport");
const version = process.env.VERSION;
require("../helpers/passport");

/**** routers *****/
const indexRouter = require("./index");
const moviesRouter = require("./movies");
const categoriesRouter = require("./categories");
const authRouter = require("./auth");
const usersRouter = require("./users");

// Unprotected routes
router.use("/", indexRouter);
router.use(`${version}/auth`, authRouter);

// Protected routes
router.use(
  `${version}/movies`,
  passport.authenticate("jwt", { session: false }),
  moviesRouter
);
router.use(
  `${version}/categories`,
  passport.authenticate("jwt", { session: false }),
  categoriesRouter
);
router.use(
  `${version}/users`,
  passport.authenticate("jwt", { session: false }),
  usersRouter
);

module.exports = router;
