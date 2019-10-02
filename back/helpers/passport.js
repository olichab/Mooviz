const knex = require("../db/knex");
const bcrypt = require("bcrypt");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

const jwtSecret = process.env.JWT_SECRET;

/**** PASSPORT LOCAL AUTHENTICATION *****/

passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false
    },
    (email, password, cb) => {
      knex("Users")
        .select("id_user", "password", "pseudo")
        .where("email", "=", email)
        .andWhere("is_active", "=", 1)
        .then(user => {
          if (!user || !user.length)
            return cb(null, false, { message: "Your email is invalid" });
          if (!bcrypt.compareSync(password, user[0].password))
            return cb(null, false, { message: "Your password is incorrect" });
          return cb(null, user[0]);
        })
        .catch(err => {
          return cb(err);
        });
    }
  )
);

/**** PASSPORT CHECK TOKEN *****/

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("Bearer");
opts.secretOrKey = jwtSecret;

passport.use(
  new JWTStrategy(opts, (token, cb) => {
    try {
      knex("Users")
        .select("id_user")
        .where("id_user", "=", token.id)
        .andWhere("pseudo", "=", token.pseudo)
        .andWhere("is_active", "=", 1)
        .then(user => {
          if (user) {
            // console.log("user found in db");
            return cb(null, user);
          } else {
            // console.log("user not found in db");
            return cb(null, false);
          }
        });
    } catch (error) {
      return cb(error);
    }
  })
);
