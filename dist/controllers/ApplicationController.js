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
const cryptService_1 = require("../services/cryptService");
const boom_1 = require("boom");
const UserModel_1 = require("../db/models/UserModel");
const SessionModel_1 = require("../db/models/SessionModel");
const authService_1 = require("../services/authService");
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { qtype } = req.query;
    if (!qtype)
        qtype = "default";
    switch (qtype) {
        case "token":
            const { token } = req.body;
            if (!token)
                return next(boom_1.default.unauthorized("Token not found"));
            try {
                const tokenData = yield cryptService_1.default.verify(token);
                const sessionId = yield tokenData.id;
                if (!sessionId)
                    return next(boom_1.default.unauthorized("Session not found"));
                const session = yield SessionModel_1.default.findOne({ _id: sessionId });
                if (!session)
                    return next(boom_1.default.unauthorized("Session does not exist"));
                const user_id = session.user;
                const user = yield UserModel_1.default.findOne({ _id: user_id });
                if (!user)
                    return next(boom_1.default.unauthorized("User does not exist"));
                const { first_name, middle_name, last_name, gender, phone, email, dob } = user;
                const name = `${first_name} ${middle_name} ${last_name}`;
                const rn = Math.floor(Math.random() * 100000000) + Date.now();
                let newTokenData = {
                    id: session.id,
                    random: rn
                };
                const newToken = cryptService_1.default.sign(newTokenData);
                const data = {
                    name: name,
                    email: email,
                    phone: phone,
                    gender: gender,
                    token: newToken
                };
                return res.json({ status: true, data, msg: "Logged In Successfully" });
            }
            catch (err) {
                console.log("==> Error in User Login Application Controller ", err);
                return next(boom_1.default.badImplementation(err));
            }
        case "default":
            const { email, pass } = req.body;
            const loggedInAt = Date.now();
            if (!email || !pass)
                return next(boom_1.default.unauthorized("E-mail address and Password are both required"));
            try {
                const authResponse = yield authService_1.default.authWithEmailPass(email, pass);
                if (!authResponse)
                    return next(boom_1.default.badRequest("Something went wrong while authenticating"));
                const user = authResponse;
                const newSession = yield SessionModel_1.default.createOne({ user_id: user._id, loggedInAt });
                const sessionId = newSession._id;
                const rn = Math.floor(Math.random() * 100000000 + Date.now());
                const { first_name, middle_name, last_name, gender, phone, dob } = user;
                const name = `${first_name} ${middle_name} ${last_name}`;
                const tokenData = {
                    id: sessionId,
                    random: rn
                };
                const token = cryptService_1.default.sign(tokenData);
                const data = {
                    name: `${user.first_name} ${user.middle_name} ${user.last_name}`,
                    gender: gender,
                    dob: dob,
                    email: email,
                    phone: phone,
                    token: token,
                    role: user.role
                };
                return res.json({ status: true, data, msg: "Logged in Successfully" });
            }
            catch (err) {
                console.log("==> Error in User Login Application Controller[Mode:Default] ", err);
                return next(boom_1.default.badImplementation(err));
            }
    }
});
const applicationController = {
    login: login
};
exports.default = applicationController;
//# sourceMappingURL=ApplicationController.js.map