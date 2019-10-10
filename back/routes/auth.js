/**** import modules *****/
require("dotenv").config();
const express = require("express");
const router = express.Router();
const knex = require("../db/knex");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const checkIfUserExist = require("../helpers/checkIfUserExist");

require("../helpers/passport");

const domain = process.env.DOMAIN_NAME;
const jwtSecret = process.env.JWT_SECRET;

// Sign in
// Ex: http://localhost:3001/V1/api/auth/signin

router.post("/signin", (req, res) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) return res.status(500).send(err);
    if (!user) return res.status(401).json({ message: info.message });
    const tokenInfo = {
      id: user.id_user,
      pseudo: user.pseudo
    };
    const token = jwt.sign(tokenInfo, jwtSecret, { expiresIn: "48h" });
    return res
      .header("Access-Control-Expose-Headers", "x-access-token")
      .set("x-access-token", token)
      .end();
  })(req, res);
});

// Sign up
// Ex: http://localhost:3001/V1/api/auth/signup

router.post("/signup", async (req, res) => {
  const { email, pseudo, password, passwordBis } = req.body;
  // Check email
  if (!email.length)
    return res.status(401).json({ message: "You need to fill in an email" });
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const emailValid = regex.test(String(email).toLowerCase());
  if (!emailValid)
    return res
      .status(401)
      .json({ message: "Your email is incorrectly formatted" });
  //Check pseudo
  if (!pseudo.length)
    return res.status(401).json({ message: "You need to fill in a pseudo" });
  // Check match password
  if (password !== passwordBis)
    return res.status(401).json({ message: "Passwords don't match." });
  //Check if email and pseudo exists
  const user = await checkIfUserExist(email, pseudo);
  if (user)
    return res
      .status(401)
      .json({ message: "This mail or pseudo already exists" });
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
    if (result)
      return res
        .status(201)
        .json({ message: "Your account was successfully created" });
  } catch (error) {
    console.error(error);
  }
});

// Profile fetch
// Ex: http://localhost:3001/V1/api/auth/profilefetch

router.post("/profilefetch", (req, res) => {
  const tokenToVerify = req.body.token;
  const result = jwt.verify(tokenToVerify, jwtSecret);
  if (!result.id) return res.status(401).send("Invalid token");
  res.status(200).send(result.pseudo);
});

module.exports = router;
