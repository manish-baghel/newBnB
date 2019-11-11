"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const util_1 = require("util");
exports.verify = util_1.promisify(jwt.verify);
exports.sign = jwt.sign;
//# sourceMappingURL=jwtService.js.map