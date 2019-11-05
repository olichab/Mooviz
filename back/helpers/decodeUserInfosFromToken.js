/**** Import modules *****/
const jwt = require("jsonwebtoken");

/**** Environment variables *****/
const jwtSecret = process.env.JWT_SECRET;

/**
 * Decode id userfrom token
 * @param {Request} req
 * @returns {Array} user infos : id, email, pseudo
 */
const decodeUserInfosFromToken = req => {
  let userInfos = {};
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, jwtSecret, (err, decoded) => {
    userInfos = {
      id: decoded.id,
      email: decoded.email,
      pseudo: decoded.pseudo
    };
  });
  return userInfos;
};

module.exports = decodeUserInfosFromToken;
