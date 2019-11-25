"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Import modules */
var router = require('express').Router();
var passport = require('passport');
var version = process.env.VERSION;
require('../helpers/passport');
/** Routers */
var indexRouter = require("./index");
var moviesRouter = require("./movies");
var categoriesRouter = require("./categories");
var authRouter = require("./auth");
var usersRouter = require("./users");
// Unprotected routes
router.use('/', indexRouter);
router.use(version + "/auth", authRouter);
// Protected routes
router.use(version + "/movies", passport.authenticate('jwt', { session: false }), moviesRouter);
router.use(version + "/categories", passport.authenticate('jwt', { session: false }), categoriesRouter);
router.use(version + "/users", passport.authenticate('jwt', { session: false }), usersRouter);
module.exports = router;
//# sourceMappingURL=router.js.map