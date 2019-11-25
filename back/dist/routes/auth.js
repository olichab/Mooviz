"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/** Import modules */
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var Ajv = require('ajv');
var knex = require('../../config/db/knex');
var getUsersByEmailOrPseudo = require('../helpers/getUsersByEmailOrPseudo');
require('dotenv').config();
require('../helpers/passport');
/** AJV data Validation */
var ajv = new Ajv({
    allErrors: true,
    jsonPointers: true,
    $data: true,
    format: 'full',
});
require('ajv-errors')(ajv);
var validateSignIn = ajv.compile(require('../ajv/schemas/formSignIn'));
var validateSignUp = ajv.compile(require('../ajv/schemas/formSignUp'));
/** Environment variables */
var jwtSecret = process.env.JWT_SECRET;
// Sign in
// Ex: http://localhost:3001/V1/api/auth/signin
router.post('/signin', function (req, res) {
    var dataValidSignIn = validateSignIn(req.body);
    if (!dataValidSignIn) {
        var errorMessage = validateSignIn.errors[0].message;
        return res.status(400).send({ message: errorMessage });
    }
    passport.authenticate('local', { session: false }, function (err, user, info) {
        if (err)
            return res.status(500).send(err);
        if (!user)
            return res.status(401).json({ message: info.message });
        var tokenInfo = {
            id: user.idUser,
            email: user.email,
            pseudo: user.pseudo,
        };
        var token = jwt.sign(tokenInfo, jwtSecret, { expiresIn: '48h' });
        return res
            .header('Access-Control-Expose-Headers', 'x-access-token')
            .set('x-access-token', token)
            .send(user.pseudo)
            .end();
    })(req, res);
});
// Sign up
// Ex: http://localhost:3001/V1/api/auth/signup
router.post('/signup', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, pseudo, password, dataValidSignUp, errorMessage, user, i, hashPassword, fixDataUsers, result, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, pseudo = _a.pseudo, password = _a.password;
                dataValidSignUp = validateSignUp(req.body);
                if (!dataValidSignUp) {
                    errorMessage = validateSignUp.errors[0].message;
                    return [2 /*return*/, res.status(400).send({ message: errorMessage })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, getUsersByEmailOrPseudo(email, pseudo)];
            case 2:
                user = _b.sent();
                for (i = 0; i < user.length; i += 1) {
                    if (user[i].email === email) {
                        return [2 /*return*/, res.status(400).json({ message: 'This email already exists' })];
                    }
                    if (user[i].pseudo === pseudo) {
                        return [2 /*return*/, res.status(400).json({ message: 'This pseudo already exists' })];
                    }
                }
                hashPassword = bcrypt.hashSync(password, 10);
                fixDataUsers = {
                    pseudo: pseudo,
                    email: email,
                    password: hashPassword,
                    isActive: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };
                return [4 /*yield*/, knex('Users').insert(fixDataUsers)];
            case 3:
                result = _b.sent();
                if (result) {
                    return [2 /*return*/, res
                            .status(201)
                            .json({ message: 'Your account was successfully created' })];
                }
                return [3 /*break*/, 5];
            case 4:
                error_1 = _b.sent();
                console.error(error_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
// Profile fetch
// Ex: http://localhost:3001/V1/api/auth/profilefetch
router.post('/profilefetch', function (req, res) {
    var tokenToVerify = req.body.token;
    jwt.verify(tokenToVerify, jwtSecret, function (err, decoded) {
        if (!decoded)
            return res.status(401).send('Invalid token');
        return res.status(200).send(decoded.pseudo);
    });
});
module.exports = router;
//# sourceMappingURL=auth.js.map