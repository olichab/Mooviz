/** Import modules */
const router = require('express').Router();
const passport = require('passport');

const version = process.env.VERSION;
require('../helpers/passport');

/** Routers */
import indexRouter = require('./index');
import moviesRouter = require('./movies');
import categoriesRouter = require('./categories');
import authRouter = require('./auth');
import usersRouter = require('./users');

// Unprotected routes
router.use('/', indexRouter);
router.use(`${version}/auth`, authRouter);

// Protected routes
router.use(
  `${version}/movies`,
  passport.authenticate('jwt', { session: false }),
  moviesRouter,
);
router.use(
  `${version}/categories`,
  passport.authenticate('jwt', { session: false }),
  categoriesRouter,
);
router.use(
  `${version}/users`,
  passport.authenticate('jwt', { session: false }),
  usersRouter,
);

module.exports = router;
