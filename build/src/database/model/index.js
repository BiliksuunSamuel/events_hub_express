"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModel = exports.CommentModel = exports.EventModel = exports.AdminModel = exports.UserModel = void 0;
const index_1 = require("./../schema/index");
const mongoose_1 = __importDefault(require("mongoose"));
exports.UserModel = mongoose_1.default.model("user", index_1.UserSchema);
exports.AdminModel = mongoose_1.default.model("admin", index_1.AdminSchema);
exports.EventModel = mongoose_1.default.model("event", index_1.EventSchema);
exports.CommentModel = mongoose_1.default.model("comment", index_1.CommentSchema);
exports.AuthModel = mongoose_1.default.model("auth", index_1.AuthSchema);
