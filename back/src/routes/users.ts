/** Import modules */
import { Request, Response } from 'express';

require('dotenv').config();
const router = require('express').Router();
const bcrypt = require('bcrypt');
const Ajv = require('ajv');
const knex = require('../../config/db/knex');
const getUsersByEmailOrPseudo = require('../helpers/getUsersByEmailOrPseudo');
const decodeUserInfosFromToken = require('../helpers/decodeUserInfosFromToken');

/** AJV data Validation */
const ajv = new Ajv({
  allErrors: true,
  jsonPointers: true,
  $data: true,
  format: 'full',
});
require('ajv-errors')(ajv);
const validate = ajv.compile(require('../ajv/schemas/formUpdateUser'));

/** Interfaces */
interface IPassword {
  password: string;
}

// Get infos user
// Ex: http://localhost:3001/V1/api/users

router.get('/', async (req: Request, res: Response) => {
  const idUser = decodeUserInfosFromToken(req).id;
  try {
    const result = await knex('Users')
      .select('email', 'pseudo')
      .where({ idUser });
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Reset password
// Ex: http://localhost:3001/V1/api/users/reset

router.post('/reset', (req: Request, res: Response) => {
  res.send('Reset password');
});

// Update user
// Ex: http://localhost:3001/V1/api/users

router.put('/', async (req: Request, res: Response) => {
  const idUser = decodeUserInfosFromToken(req).id;
  const {
    email,
    pseudo,
    oldPassword,
    newPassword,
    confirmNewPassword,
  } = req.body;
  const dataValidUpdateUser = validate(req.body);

  /**
   * Get password according to user id
   * @param {Number} idUser user id
   * @returns {Array} password
   */

  const getPasswordById = async (): Promise<IPassword[] | undefined> => {
    try {
      const result = await knex('Users')
        .select('password')
        .where({ idUser });
      return result;
    } catch (error) {
      console.error('error', error);
    }
  };

  if (!dataValidUpdateUser) {
    const errorMessage = validate.errors[0].message;
    return res.status(400).send({ message: errorMessage });
  }
  try {
    const user = await getUsersByEmailOrPseudo(email, pseudo);
    // Check if email or pseudo already exists
    for (let i = 0; i < user.length; i += 1) {
      if (
        user[i].email.toLowerCase() === email.toLowerCase()
        && user[i].idUser !== idUser
      ) {
        return res.status(400).json({ message: 'This email already exists' });
      }
      if (
        user[i].pseudo.toLowerCase() === pseudo.toLowerCase()
        && user[i].idUser !== idUser
      ) {
        return res.status(400).json({ message: 'This pseudo already exists' });
      }
    }
    // If password fields filled
    if (oldPassword.length && newPassword.length && confirmNewPassword.length) {
      const userPassword = await getPasswordById();
      // Check if old password match
      if (
        userPassword !== undefined
        && !bcrypt.compareSync(oldPassword, userPassword[0].password)
      ) {
        return res
          .status(400)
          .json({ message: 'Your old password is incorrect' });
      }
      // Update mail, pseudo and password
      const hashPassword = bcrypt.hashSync(newPassword, 10);
      knex('Users')
        .where({ idUser })
        .update({
          email,
          pseudo,
          password: hashPassword,
          thisKeyIsSkipped: undefined,
        })
        .then(() => {
          res.status(200).json({ message: 'Your profile has been updated' });
        });
    } else {
      // If password fields not filled, update only mail and pseudo
      knex('Users')
        .where({ idUser })
        .update({
          email,
          pseudo,
          thisKeyIsSkipped: undefined,
        })
        .then(() => {
          res.status(200).json({ message: 'Your profile has been updated' });
        });
    }
  } catch (error) {
    console.error('error', error);
  }
});

module.exports = router;
