"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApplicationController_1 = require("../controllers/ApplicationController");
exports.HttpRoutes = (app) => {
    app.get('/', ApplicationController_1.default.login);
};
//# sourceMappingURL=index.js.map