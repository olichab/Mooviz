const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

/**
 * Decode id userfrom token
 * @param {Request} req
 * @returns {Number} id user
 */
const decodeIdUserFromToken = req => {
  let id_user = null;
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, jwtSecret, (err, decoded) => {
    id_user = decoded.id;
  });
  return id_user;
};

module.exports = decodeIdUserFromToken;
