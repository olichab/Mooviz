/** Imports modules */
const knex = require('../../config/db/knex');

/** Interfaces */
interface IUser {
  idUser: number;
  pseudo: string;
  email: string;
}

/**
 * Checks if email or pseudo exists.
 * @param {String} email
 * @param {String} pseudo
 * @returns {Array} users found in db.
 */
const getUsersByEmailOrPseudo = async (
  email: string,
  pseudo: string,
): Promise<IUser[]> => {
  const user = await knex('Users')
    .select('idUser', 'pseudo', 'email')
    .where({ email })
    .orWhere({ pseudo });
  return user;
};

module.exports = getUsersByEmailOrPseudo;
