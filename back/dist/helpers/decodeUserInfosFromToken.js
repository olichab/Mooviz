"use strict";
/** Import modules */
var jwt = require('jsonwebtoken');
/** Environment variables */
var jwtSecret = process.env.JWT_SECRET;
/**
 * Decode id userfrom token
 * @param {Request} req
 * @returns {Object} user infos : id, email, pseudo
 */
var decodeUserInfosFromToken = function (req) {
    var userInfos = { id: null, email: '', pseudo: '' };
    var token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, jwtSecret, function (err, decoded) {
        userInfos = {
            id: decoded.id,
            email: decoded.email,
            pseudo: decoded.pseudo,
        };
    });
    return userInfos;
};
module.exports = decodeUserInfosFromToken;
//# sourceMappingURL=decodeUserInfosFromToken.js.map