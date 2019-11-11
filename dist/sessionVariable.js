"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yenv = require("yenv");
const getEnv = (environment) => {
    const sessionVariables = yenv("settings.yaml", { env: environment });
    return sessionVariables;
};
exports.default = getEnv;
//# sourceMappingURL=sessionVariable.js.map