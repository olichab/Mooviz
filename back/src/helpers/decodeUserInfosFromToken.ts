/** Import modules */
const jwt = require('jsonwebtoken');

/** Environment variables */
const jwtSecret = process.env.JWT_SECRET;

/** Interfaces */
interface IUserInfos {
  id: number | null;
  email: string;
  pseudo: string;
}

/**
 * Decode id userfrom token
 * @param {Request} req
 * @returns {Object} user infos : id, email, pseudo
 */
const decodeUserInfosFromToken = (req): IUserInfos => {
  let userInfos = { id: null, email: '', pseudo: '' };
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, jwtSecret, (err, decoded) => {
    userInfos = {
      id: decoded.id,
      email: decoded.email,
      pseudo: decoded.pseudo,
    };
  });
  return userInfos;
};

module.exports = decodeUserInfosFromToken;
