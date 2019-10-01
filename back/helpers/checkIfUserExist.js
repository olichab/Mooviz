const bcrypt = require("bcrypt");
const knex = require("../db/knex");

/**
 * Checks if email or pseudo exists.
 * @param {String} email
 * @param {String} pseudo
 * @returns {Boolean} true if email or pseudo found in db.
 */
const checkIfUserExist = async (email, pseudo) => {
  const user = await knex("Users")
    .select("id_user", "password", "pseudo")
    .where("email", "=", email)
    .orWhere("pseudo", "=", pseudo)
    .andWhere("is_active", "=", 1);
  return user.length ? true : false;
};

module.exports = checkIfUserExist;
