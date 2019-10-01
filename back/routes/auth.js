/**** import modules *****/
require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const knex = require("../db/knex");
const checkIfUserExist = require("../helpers/checkIfUserExist");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const domain = process.env.DOMAIN_NAME;
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
          if (err) return cb(err);
        });
    }
  )
);

// Sign in
// Ex: http://localhost:3001/V1/api/auth/signin

router.route("/signin").post((req, res) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return res.status(500).send(err);
    if (!user) return res.status(400).json({ message: info.message });
    const tokenInfo = {
      id: user.id_user,
      pseudo: user.pseudo
    };
    const token = jwt.sign(tokenInfo, jwtSecret, { expiresIn: "48h" });
    return res
      .header("Access-Control-Expose-Headers", "x-access-token")
      .set("x-access-token", token)
      .json({
        id_user: user.id_user,
        pseudo: user.pseudo
      });
  })(req, res);
});


// Sign up
// Ex: http://localhost:3001/V1/api/auth/signup

router.route("/signup").post(async (req, res) => {
  const { email, pseudo, password, passwordBis } = req.body;
  // Check email
  if (!email.length) return res.status(401).json({ message: "You need to fill in an email" });
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const emailValid = regex.test(String(email).toLowerCase());
  if (!emailValid) return res.status(401).json({ message: "Your email is incorrectly formatted" });
  //Check pseudo
  if (!pseudo.length) return res.status(401).json({ message: "You need to fill in a pseudo" });
  // Check match password
  if (password!==passwordBis) return res.status(401).json({ message: "Passwords don't match." });
  //Check if email and pseudo exists
  const user = await checkIfUserExist(email, pseudo);
  if (user) return res.status(401).json({ message: "This mail or pseudo already exists" });

  let hashPassword = bcrypt.hashSync(password, 10);
  const fixDataUsers = {
    pseudo,
    email,
    password: hashPassword,
    is_active: 1,
    created_at: new Date(),
    updated_at: new Date()
  };
  try {
    // Insert in users table
    const result = await knex("Users").insert(fixDataUsers);
    if (result) return res.status(201).json({ message: "Your account was successfully created"});
  } catch (error) {
    console.error(error);
  }
});

// Profile fetch
// Ex: http://localhost:3001/V1/api/auth/profilefetch

router.route("/profilefetch").post((req, res) => {
  const tokenToVerify = req.body.token;
  const result = jwt.verify(tokenToVerify, jwtSecret);
  if (!result.id) return res.status(401).send("Invalid token");
  res.status(200).send("Valid token");
});

module.exports = router;
