"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const app_1 = require("../app");
const DB_URL = `${app_1.env.DB_URL}:${app_1.env.DB_PORT}/${app_1.env.DB_NAME}`;
mongoose_1.default.connect(DB_URL);
const db = mongoose_1.default.connection;
db.on('error', console.error.bind(console, '==> connection error: '));
db.once('open', () => {
    console.log(`--> We are connected to db at: ${DB_URL}`);
});
exports.default = db;
//# sourceMappingURL=initDb.js.map