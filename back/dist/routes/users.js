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
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var router = require('express').Router();
var bcrypt = require('bcrypt');
var Ajv = require('ajv');
var knex = require('../../config/db/knex');
var getUsersByEmailOrPseudo = require('../helpers/getUsersByEmailOrPseudo');
var decodeUserInfosFromToken = require('../helpers/decodeUserInfosFromToken');
/** AJV data Validation */
var ajv = new Ajv({
    allErrors: true,
    jsonPointers: true,
    $data: true,
    format: 'full',
});
require('ajv-errors')(ajv);
var validate = ajv.compile(require('../ajv/schemas/formUpdateUser'));
// Get infos user
// Ex: http://localhost:3001/V1/api/users
router.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idUser, result, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                idUser = decodeUserInfosFromToken(req).id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, knex('Users')
                        .select('email', 'pseudo')
                        .where({ idUser: idUser })];
            case 2:
                result = _a.sent();
                res.status(200).send(result);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                res.status(400).send(error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Reset password
// Ex: http://localhost:3001/V1/api/users/reset
router.post('/reset', function (req, res) {
    res.send('Reset password');
});
// Update user
// Ex: http://localhost:3001/V1/api/users
router.put('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idUser, _a, email, pseudo, oldPassword, newPassword, confirmNewPassword, dataValidUpdateUser, getPasswordById, errorMessage, user, i, userPassword, hashPassword, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                idUser = decodeUserInfosFromToken(req).id;
                _a = req.body, email = _a.email, pseudo = _a.pseudo, oldPassword = _a.oldPassword, newPassword = _a.newPassword, confirmNewPassword = _a.confirmNewPassword;
                dataValidUpdateUser = validate(req.body);
                getPasswordById = function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result, error_3;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, knex('Users')
                                        .select('password')
                                        .where({ idUser: idUser })];
                            case 1:
                                result = _a.sent();
                                return [2 /*return*/, result];
                            case 2:
                                error_3 = _a.sent();
                                console.error('error', error_3);
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); };
                if (!dataValidUpdateUser) {
                    errorMessage = validate.errors[0].message;
                    return [2 /*return*/, res.status(400).send({ message: errorMessage })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                return [4 /*yield*/, getUsersByEmailOrPseudo(email, pseudo)];
            case 2:
                user = _b.sent();
                // Check if email or pseudo already exists
                for (i = 0; i < user.length; i += 1) {
                    if (user[i].email.toLowerCase() === email.toLowerCase()
                        && user[i].idUser !== idUser) {
                        return [2 /*return*/, res.status(400).json({ message: 'This email already exists' })];
                    }
                    if (user[i].pseudo.toLowerCase() === pseudo.toLowerCase()
                        && user[i].idUser !== idUser) {
                        return [2 /*return*/, res.status(400).json({ message: 'This pseudo already exists' })];
                    }
                }
                if (!(oldPassword.length && newPassword.length && confirmNewPassword.length)) return [3 /*break*/, 4];
                return [4 /*yield*/, getPasswordById()];
            case 3:
                userPassword = _b.sent();
                // Check if old password match
                if (userPassword !== undefined
                    && !bcrypt.compareSync(oldPassword, userPassword[0].password)) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: 'Your old password is incorrect' })];
                }
                hashPassword = bcrypt.hashSync(newPassword, 10);
                knex('Users')
                    .where({ idUser: idUser })
                    .update({
                    email: email,
                    pseudo: pseudo,
                    password: hashPassword,
                    thisKeyIsSkipped: undefined,
                })
                    .then(function () {
                    res.status(200).json({ message: 'Your profile has been updated' });
                });
                return [3 /*break*/, 5];
            case 4:
                // If password fields not filled, update only mail and pseudo
                knex('Users')
                    .where({ idUser: idUser })
                    .update({
                    email: email,
                    pseudo: pseudo,
                    thisKeyIsSkipped: undefined,
                })
                    .then(function () {
                    res.status(200).json({ message: 'Your profile has been updated' });
                });
                _b.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                error_2 = _b.sent();
                console.error('error', error_2);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
module.exports = router;
//# sourceMappingURL=users.js.map