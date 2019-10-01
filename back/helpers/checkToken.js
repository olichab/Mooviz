const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

/**
 * Allows to check if the user is signed in
 */
const checkToken = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  let result;
  if (authorizationHeader) {
    const token = req.headers.authorization.split(" ")[1]; // Bearer <token>
    try {
      // verify makes sure that the token hasn't expired and has been issued by us
      jwt.verify(token, jwtSecret);
      // We call next to pass execution to the subsequent middleware
      next();
    } catch (err) {
      console.error(err);
    }
  } else {
    result = {
      error: `Authentication error. Token required.`,
      status: 401
    };
    res.status(401).send(result);
  }
};

module.exports = checkToken;