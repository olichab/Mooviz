const bcrypt = require("bcrypt");
const knex = require("../db/knex");

/**
 * Checks if email or pseudo exists.
 * @param {String} email
 * @param {String} pseudo
 * @returns {Array} users found in db.
 */
const getUsersByEmailOrPseudo = async (email, pseudo) => {
  const user = await knex("Users")
    .select("id_user", "pseudo", "email")
    .where({ email: email })
    .orWhere({ pseudo: pseudo });
  return user;
};

module.exports = getUsersByEmailOrPseudo;
