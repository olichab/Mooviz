/** Import modules */
import express, { Request, Response } from 'express';

const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const Ajv = require('ajv');
const knex = require('../../config/db/knex');
const getUsersByEmailOrPseudo = require('../helpers/getUsersByEmailOrPseudo');
require('dotenv').config();
require('../helpers/passport');

/** AJV data Validation */

const ajv = new Ajv({
  allErrors: true,
  jsonPointers: true,
  $data: true,
  format: 'full',
});
require('ajv-errors')(ajv);

const validateSignIn = ajv.compile(require('../ajv/schemas/formSignIn'));
const validateSignUp = ajv.compile(require('../ajv/schemas/formSignUp'));

/** Environment variables */
const jwtSecret = process.env.JWT_SECRET;

// Sign in
// Ex: http://localhost:3001/V1/api/auth/signin

router.post('/signin', (req: Request, res: Response) => {
  const dataValidSignIn = validateSignIn(req.body);
  if (!dataValidSignIn) {
    const errorMessage = validateSignIn.errors[0].message;
    return res.status(400).send({ message: errorMessage });
  }
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) return res.status(500).send(err);
    if (!user) return res.status(401).json({ message: info.message });
    const tokenInfo = {
      id: user.idUser,
      email: user.email,
      pseudo: user.pseudo,
    };
    const token = jwt.sign(tokenInfo, jwtSecret, { expiresIn: '48h' });
    return res
      .header('Access-Control-Expose-Headers', 'x-access-token')
      .set('x-access-token', token)
      .send(user.pseudo)
      .end();
  })(req, res);
});

// Sign up
// Ex: http://localhost:3001/V1/api/auth/signup

router.post('/signup', async (req: Request, res: Response) => {
  const { email, pseudo, password } = req.body;
  const dataValidSignUp = validateSignUp(req.body);
  if (!dataValidSignUp) {
    const errorMessage = validateSignUp.errors[0].message;
    return res.status(400).send({ message: errorMessage });
  }
  try {
    // Check if email and pseudo exists
    const user = await getUsersByEmailOrPseudo(email, pseudo);
    for (let i = 0; i < user.length; i += 1) {
      if (user[i].email === email) {
        return res.status(400).json({ message: 'This email already exists' });
      }
      if (user[i].pseudo === pseudo) {
        return res.status(400).json({ message: 'This pseudo already exists' });
      }
    }
    const hashPassword = bcrypt.hashSync(password, 10);
    const fixDataUsers = {
      pseudo,
      email,
      password: hashPassword,
      isActive: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    // Insert in users table
    const result = await knex('Users').insert(fixDataUsers);
    if (result) {
      return res
        .status(201)
        .json({ message: 'Your account was successfully created' });
    }
  } catch (error) {
    console.error(error);
  }
});

// Profile fetch
// Ex: http://localhost:3001/V1/api/auth/profilefetch

router.post('/profilefetch', (req: Request, res: Response) => {
  const tokenToVerify = req.body.token;
  jwt.verify(tokenToVerify, jwtSecret, (err, decoded) => {
    if (!decoded) return res.status(401).send('Invalid token');
    return res.status(200).send(decoded.pseudo);
  });
});

module.exports = router;
