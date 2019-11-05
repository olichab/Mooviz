/**** Import modules *****/
let express = require("express");
let router = express.Router();
const bcrypt = require("bcrypt");
const knex = require("../db/knex");
const getUsersByEmailOrPseudo = require("../helpers/getUsersByEmailOrPseudo");
const decodeUserInfosFromToken = require("../helpers/decodeUserInfosFromToken");

/**** AJV data Validation *****/
const Ajv = require("ajv");
const ajv = new Ajv({
  allErrors: true,
  jsonPointers: true,
  $data: true,
  format: "full"
});
require("ajv-errors")(ajv);
const validate = ajv.compile(require("../ajv/schemas/formUpdateUser"));

// Get infos user
// Ex: http://localhost:3001/V1/api/users

router.get("/", async (req, res) => {
  const idUser = decodeUserInfosFromToken(req).id;
  try {
    const result = await knex("Users")
      .select("email", "pseudo")
      .where({ id_user: idUser });
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Reset password
// Ex: http://localhost:3001/V1/api/users/reset

router.post("/reset", (req, res) => {
  res.send("Reset password");
});

// Update user
// Ex: http://localhost:3001/V1/api/users

router.put("/", async (req, res) => {
  const idUser = decodeUserInfosFromToken(req).id;
  const {
    email,
    pseudo,
    oldPassword,
    newPassword,
    confirmNewPassword
  } = req.body;
  const dataValidUpdateUser = validate(req.body);

  /**
   * Get password according to user id
   * @param {Number} idUser user id
   * @returns {Array} password
   */
  const getPasswordById = async idUser => {
    try {
      const result = await knex("Users")
        .select("password")
        .where({ id_user: idUser });
      return result;
    } catch (error) {
      console.error("error", error);
    }
  };

  if (!dataValidUpdateUser) {
    const errorMessage = validate.errors[0].message;
    return res.status(400).send({ message: errorMessage });
  } else {
    try {
      const user = await getUsersByEmailOrPseudo(email, pseudo);
      // Check if email or pseudo already exists
      for (let i = 0; i < user.length; i++) {
        if (
          user[i].email.toLowerCase() === email.toLowerCase() &&
          user[i].id_user !== idUser
        ) {
          return res.status(400).json({ message: "This email already exists" });
        } else if (
          user[i].pseudo.toLowerCase() === pseudo.toLowerCase() &&
          user[i].id_user !== idUser
        ) {
          return res
            .status(400)
            .json({ message: "This pseudo already exists" });
        }
      }
      // If password fields filled
      if (
        oldPassword.length &&
        newPassword.length &&
        confirmNewPassword.length
      ) {
        const userPassword = await getPasswordById(idUser);
        // Check if old password match
        if (!bcrypt.compareSync(oldPassword, userPassword[0].password)) {
          return res
            .status(400)
            .json({ message: "Your old password is incorrect" });
        } else {
          // Update mail, pseudo and password
          let hashPassword = bcrypt.hashSync(newPassword, 10);
          knex("Users")
            .where({ id_user: idUser })
            .update({
              email: email,
              pseudo: pseudo,
              password: hashPassword,
              thisKeyIsSkipped: undefined
            })
            .then(() => {
              res
                .status(200)
                .json({ message: "Your profile has been updated" });
            });
        }
      } else {
        // If password fields not filled, update only mail and pseudo
        knex("Users")
          .where({ id_user: idUser })
          .update({
            email: email,
            pseudo: pseudo,
            thisKeyIsSkipped: undefined
          })
          .then(() => {
            res.status(200).json({ message: "Your profile has been updated" });
          });
      }
    } catch (error) {
      console.error("error", error);
    }
  }
});

module.exports = router;
