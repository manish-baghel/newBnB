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
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("./jwtService");
const bcrypt = require("bcryptjs");
const util_1 = require("util");
const app_1 = require("../app");
const SESSION_SECRET = app_1.env.SESSION_SECRET;
const SALT_ROUNDS = app_1.env.SALT_ROUNDS;
const _hash = (pass, cb) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hash = util_1.promisify(bcrypt.hash);
        const hashed = yield hash(pass, SALT_ROUNDS);
        return cb(null, hashed);
    }
    catch (err) {
        console.log("==> Error in _hash cryptService: ", err);
        return cb(err, null);
    }
});
const _verify = (token, cb) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenData = yield jwt.verify(token, SESSION_SECRET);
        return cb(null, { id: tokenData.id });
    }
    catch (err) {
        console.log("==> Error in _verify cryptService: ", err);
        return cb(err, null);
    }
});
const _compare = (str, hash, cb) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isEqual = yield bcrypt.compare(str, hash);
        return cb(null, isEqual);
    }
    catch (err) {
        console.log("==> Error in _compare cryptService: ", err);
        return cb(err, null);
    }
});
const _sign = (payload) => {
    return jwt.sign(payload, SESSION_SECRET);
};
const cryptService = {
    hash: util_1.promisify(_hash),
    verify: util_1.promisify(_verify),
    compare: util_1.promisify(_compare),
    sign: _sign
};
exports.default = cryptService;
//# sourceMappingURL=cryptService.js.map