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
/** Imports modules */
var express_1 = __importDefault(require("express"));
var moment_1 = __importDefault(require("moment"));
var router = express_1.default.Router();
var knex = require('../../config/db/knex');
var decodeUserInfosFromToken = require('../helpers/decodeUserInfosFromToken');
// List of all movie with categories
// Ex: http://localhost:3001/V1/api/movies
router.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idUser, result, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                idUser = decodeUserInfosFromToken(req).id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, knex({
                        m: 'Movies',
                        c: 'Categories',
                        u: 'Users',
                        um: 'Users_Movies',
                    })
                        .select('m.idMovie', 'm.name', 'm.director', 'm.synopsis', 'm.linkPoster', 'm.releaseDate', 'm.duration', 'c.nameCategory')
                        .whereRaw('m.idCategory = c.idCategory')
                        .whereRaw('um.idUser = u.idUser')
                        .whereRaw('um.idMovie = m.idMovie')
                        .andWhere('um.idUser', idUser)
                        .andWhere('um.isActive', 1)
                        .orderBy('m.name')];
            case 2:
                result = _a.sent();
                res.status(200).send(result);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.error('error', error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Delete a movie
// Ex: http://localhost:3001/V1/api/movies/deletemovie/:id
router.put('/deletemovie/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idUser, idMovie, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                idUser = decodeUserInfosFromToken(req).id;
                idMovie = Number(req.params.id);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, knex({
                        m: 'Movies',
                        u: 'Users',
                        um: 'Users_Movies',
                    })
                        .whereRaw('um.iduser = u.idUser')
                        .whereRaw('um.idMovie = m.idMovie')
                        .where('um.idMovie', '=', idMovie)
                        .andWhere('um.idUser', idUser)
                        .update({
                        'um.isActive': 0,
                        thisKeyIsSkipped: undefined,
                    })];
            case 2:
                _a.sent();
                res
                    .status(200)
                    .json({ id: idMovie, message: 'The movie has been deleted' });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.error('error', error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Add new movie
// Ex: http://localhost:3001/V1/api/movies/newmovie
router.post('/newmovie', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, director, synopsis, linkPoster, duration, nameCategory, releaseDate, category, idUser, checkMovieInDb, checkIfMovieIsActiveForUser, updateIsActiveField, assignMovieToUser, addMovieInDb;
    return __generator(this, function (_b) {
        _a = req.body, name = _a.name, director = _a.director, synopsis = _a.synopsis, linkPoster = _a.linkPoster, duration = _a.duration, nameCategory = _a.nameCategory;
        releaseDate = req.body.releaseDate
            ? moment_1.default(req.body.releaseDate).format('YYYY-MM-DD')
            : null;
        category = nameCategory.length ? nameCategory : 'No category';
        idUser = decodeUserInfosFromToken(req).id;
        checkMovieInDb = function (nameMovie) { return __awaiter(void 0, void 0, void 0, function () {
            var result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, knex('Movies')
                                .select('idMovie')
                                .where('name', nameMovie)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result[0] ? result[0].idMovie : undefined];
                    case 2:
                        error_3 = _a.sent();
                        console.error('error1', error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        checkIfMovieIsActiveForUser = function (idMovie) { return __awaiter(void 0, void 0, void 0, function () {
            var result, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, knex({
                                m: 'Movies',
                                u: 'Users',
                                um: 'Users_Movies',
                            })
                                .select('um.isActive')
                                .whereRaw('um.idUser = u.idUser')
                                .whereRaw('um.idMovie = m.idMovie')
                                .andWhere('um.idMovie', idMovie)
                                .andWhere('u.idUser', idUser)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result[0].isActive];
                    case 2:
                        error_4 = _a.sent();
                        console.error('error', error_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        updateIsActiveField = function (idMovie) { return __awaiter(void 0, void 0, void 0, function () {
            var error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, knex({
                                m: 'Movies',
                                um: 'Users_Movies',
                            })
                                .where('um.idMovie', idMovie)
                                .andWhere('um.idUser', idUser)
                                .update({
                                'um.isActive': 1,
                                thisKeyIsSkipped: undefined,
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        console.error('error', error_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        assignMovieToUser = function (idMovie) { return __awaiter(void 0, void 0, void 0, function () {
            var error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, knex('Users_Movies').insert([{ idUser: idUser, idMovie: idMovie }])];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_6 = _a.sent();
                        console.error('error', error_6);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        addMovieInDb = function (categoryName) { return __awaiter(void 0, void 0, void 0, function () {
            var categ, idCategory, fixDataMovies, result, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, knex('Categories')
                                .select('idCategory')
                                .where({ nameCategory: categoryName })];
                    case 1:
                        categ = _a.sent();
                        idCategory = categ[0].idCategory;
                        fixDataMovies = {
                            name: name,
                            director: director,
                            synopsis: synopsis,
                            linkPoster: linkPoster,
                            releaseDate: releaseDate,
                            duration: duration,
                            idCategory: idCategory,
                        };
                        return [4 /*yield*/, knex('Movies').insert(fixDataMovies)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result[0]];
                    case 3:
                        error_7 = _a.sent();
                        console.error('error', error_7);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        try {
            checkMovieInDb(name).then(function (idMovie) {
                // if idMovie find
                if (idMovie !== undefined) {
                    checkIfMovieIsActiveForUser(idMovie).then(function (isActive) {
                        switch (isActive) {
                            // If user has already added movie and it is active
                            case 1:
                                return res.sendStatus(204);
                            // If user has already added movie but it is inactive
                            case 0:
                                updateIsActiveField(idMovie);
                                return res.status(201).json({ message: 'Movie has been added' });
                            // If user has never added movie
                            case undefined:
                                assignMovieToUser(idMovie);
                                return res.status(201).json({ message: 'Movie has been added' });
                            default:
                                break;
                        }
                    });
                    // if idMovie not find
                }
                else {
                    addMovieInDb(category).then(function (idMovieToAdd) {
                        if (idMovieToAdd !== undefined) {
                            assignMovieToUser(idMovieToAdd);
                        }
                    });
                    return res.status(201).json({ message: 'Movie has been added' });
                }
            });
        }
        catch (error) {
            console.error('error', error);
        }
        return [2 /*return*/];
    });
}); });
module.exports = router;
//# sourceMappingURL=movies.js.map