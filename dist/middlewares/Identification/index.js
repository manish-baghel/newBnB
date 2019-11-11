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
const boom_1 = require("boom");
const UserModel_1 = require("../../db/models/UserModel");
const identification = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.session)
        return next(boom_1.default.unauthorized("Session Not Found"));
    const userId = req.session.userId;
    if (!userId)
        return next(boom_1.default.unauthorized("user id not found"));
    try {
        const user = yield UserModel_1.default.findOne({ _id: userId });
        if (!user)
            return next(boom_1.default.unauthorized("User Not Found"));
        if (req.session.data && user.role.title != req.session.data.user.role.title)
            return next(boom_1.default.unauthorized("Stop F***in around"));
        req.session.data = {};
        req.session.data.user = {
            phone: user.phone,
            email: user.email,
            role: user.role,
            first_name: user.first_name,
            last_name: user.last_name,
        };
        return next();
    }
    catch (err) {
        console.log("==> Error in Identif. Middleware :", err);
        return next(boom_1.default.badImplementation(err));
    }
});
exports.default = identification;
//# sourceMappingURL=index.js.map