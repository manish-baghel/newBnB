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
const UserModel_1 = require("../db/models/UserModel");
const internalEventTypes = require("../constants/internalEventConstants");
const cryptService_1 = require("./cryptService");
const util_1 = require("util");
function _authenticateWithEmailPass(email, pass, cb) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!email || !pass) {
            return cb(new Error(internalEventTypes.INVALID_PROPS));
        }
        console.log('inside auth with email pass');
        try {
            const user = yield UserModel_1.default.findOne({ email: email });
            if (!user) {
                return cb(new Error(internalEventTypes.USER_NOT_FOUND), null);
            }
            const passHashed = user.password;
            const isEqual = yield cryptService_1.default.compare(pass, passHashed);
            if (!isEqual) {
                return cb(new Error(internalEventTypes.PASSWORD_NOT_VALID), null);
            }
            return cb(null, user);
        }
        catch (err) {
            console.log('inside catch ', err);
            return cb(err, null);
        }
    });
}
function _findUserWithEmail(email, cb) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!email) {
            return cb(new Error(internalEventTypes.INVALID_PROPS));
        }
        console.log('inside auth on forget password');
        try {
            const user = yield UserModel_1.default.findOne({ email: email });
            if (!user) {
                return cb(new Error(internalEventTypes.USER_NOT_FOUND), null);
            }
            return cb(null, user);
        }
        catch (err) {
            console.log('inside catch ', err);
            return cb(err, null);
        }
    });
}
const authenticationService = {
    authWithEmailPass: util_1.promisify(_authenticateWithEmailPass),
    findUserWithEmail: util_1.promisify(_findUserWithEmail)
};
exports.default = authenticationService;
//# sourceMappingURL=authService.js.map