"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthSchema = exports.UserSchema = exports.EventSchema = exports.CommentSchema = exports.AdminSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.AdminSchema = new mongoose_1.default.Schema({
    username: String,
    email: String,
    role: Number,
    status: Number,
    dateAdded: String,
    profilePicture: String,
    token: String,
    id: String,
});
exports.CommentSchema = new mongoose_1.default.Schema({
    text: String,
    userEmail: String,
    dateAdded: String,
    status: Number,
    id: String,
});
exports.EventSchema = new mongoose_1.default.Schema({
    headline: String,
    status: Number,
    userId: String,
    eventDate: String,
    dateAdded: String,
    description: String,
    image: String,
    location: {
        latitude: Number,
        longitude: Number,
    },
    address: {
        zipcode: String,
        street: String,
        city: String,
        state: String,
    },
    eventTime: String,
    id: String,
});
exports.UserSchema = new mongoose_1.default.Schema({
    username: String,
    email: String,
    authenticated: Number,
    status: Number,
    token: String,
    id: String,
    role: Number,
});
exports.AuthSchema = new mongoose_1.default.Schema({
    userId: String,
    password: String,
    otp: String,
});
