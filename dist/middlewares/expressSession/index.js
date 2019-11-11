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
const app_1 = require("../../app");
const SessionModel_1 = require("../../db/models/SessionModel");
const cryptService_1 = require("../../services/cryptService");
const expressSession = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const headerToken = req.headers[app_1.env.AUTH_TOKEN_TITLE] || req.header[app_1.env.ADMIN_AUTH_TOKEN_TITLE];
    if (!headerToken)
        return next(boom_1.default.unauthorized("token not found"));
    try {
        const tokenData = yield cryptService_1.default.verify(headerToken);
        const session = yield SessionModel_1.default.findOne({ _id: tokenData.id });
        if (!session)
            return next(boom_1.default.unauthorized("Session does not exist"));
        req.session = session;
        return next();
    }
    catch (err) {
        console.log("==> Error in expressSession: ", err);
        return next(err);
    }
});
exports.default = expressSession;
//# sourceMappingURL=index.js.map