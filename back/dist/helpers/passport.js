"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = require('bcrypt');
var passport = require('passport');
var passportJWT = require('passport-jwt');
var LocalStrategy = require('passport-local').Strategy;
var knex = require('../../config/db/knex');
var JWTStrategy = passportJWT.Strategy;
var ExtractJwt = passportJWT.ExtractJwt;
/** Environment variables */
var jwtSecret = process.env.JWT_SECRET;
/** ** PASSPORT LOCAL AUTHENTICATION **** */
passport.use('local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false,
}, function (email, password, cb) {
    knex('Users')
        .select('idUser', 'pseudo', 'email', 'password')
        .where({ email: email })
        .andWhere('isActive', '=', 1)
        .then(function (user) {
        if (!user || !user.length) {
            return cb(null, false, { message: 'Your email is invalid' });
        }
        if (!bcrypt.compareSync(password, user[0].password)) {
            return cb(null, false, { message: 'Your password is incorrect' });
        }
        return cb(null, user[0]);
    })
        .catch(function (err) { return cb(err); });
}));
/** ** PASSPORT CHECK TOKEN **** */
var opts = { jwtFromRequest: '', secretOrKey: jwtSecret };
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('Bearer');
opts.secretOrKey = jwtSecret;
passport.use(new JWTStrategy(opts, function (token, cb) {
    try {
        knex('Users')
            .select('idUser')
            .where({ idUser: token.id })
            .andWhere({ isActive: 1 })
            .then(function (user) {
            if (user) {
                // User found in db;
                return cb(null, user);
            }
            // User not found in db;
            return cb(null, false);
        });
    }
    catch (error) {
        return cb(error);
    }
}));
//# sourceMappingURL=passport.js.map