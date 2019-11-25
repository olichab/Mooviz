/** Imports modules */
export {};
const bcrypt = require('bcrypt');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const knex = require('../../config/db/knex');

const JWTStrategy = passportJWT.Strategy;
const { ExtractJwt } = passportJWT;

/** Environment variables */
const jwtSecret = process.env.JWT_SECRET;

/** ** PASSPORT LOCAL AUTHENTICATION **** */

passport.use(
  'local',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    },
    (email, password, cb) => {
      knex('Users')
        .select('idUser', 'pseudo', 'email', 'password')
        .where({ email })
        .andWhere('isActive', '=', 1)
        .then((user) => {
          if (!user || !user.length) {
            return cb(null, false, { message: 'Your email is invalid' });
          }
          if (!bcrypt.compareSync(password, user[0].password)) {
            return cb(null, false, { message: 'Your password is incorrect' });
          }
          return cb(null, user[0]);
        })
        .catch((err) => cb(err));
    },
  ),
);

/** ** PASSPORT CHECK TOKEN **** */

const opts = { jwtFromRequest: '', secretOrKey: jwtSecret };
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('Bearer');
opts.secretOrKey = jwtSecret;

passport.use(
  new JWTStrategy(opts, (token, cb) => {
    try {
      knex('Users')
        .select('idUser')
        .where({ idUser: token.id })
        .andWhere({ isActive: 1 })
        .then((user) => {
          if (user) {
            // User found in db;
            return cb(null, user);
          }
          // User not found in db;
          return cb(null, false);
        });
    } catch (error) {
      return cb(error);
    }
  }),
);
