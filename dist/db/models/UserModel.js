"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Schema = mongoose_1.default.Schema;
const roleSchema = new Schema({
    title: { type: String, required: true, trim: true }
}, { timestamps: true });
const userSchema = new Schema({
    first_name: { type: String, required: true, trim: true },
    last_name: { type: String, required: true, trim: true },
    middle_name: { type: String, trim: true },
    dob: { type: Date },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    gender: { type: String, required: true, trim: true },
    role: roleSchema,
}, { timestamps: true });
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
//# sourceMappingURL=UserModel.js.map