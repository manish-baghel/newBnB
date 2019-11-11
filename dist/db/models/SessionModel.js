"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Schema = mongoose_1.default.Schema;
const sessionSchema = new Schema({
    loggedInAt: { type: Date },
    loggedOutAt: { type: Date },
    user: { type: Schema.Types.ObjectId, ref: "User" }
});
const Session = mongoose_1.default.model('Session', sessionSchema);
exports.default = Session;
//# sourceMappingURL=SessionModel.js.map