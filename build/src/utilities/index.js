"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyPassword = exports.GenerateId = exports.HashPassword = exports.GenerateOTP = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const otp_generator_1 = __importDefault(require("otp-generator"));
const uuid_1 = require("uuid");
function GenerateOTP(len = 6) {
    return otp_generator_1.default.generate(len, {
        specialChars: false,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
    });
}
exports.GenerateOTP = GenerateOTP;
function HashPassword(password = "") {
    return new Promise(function (resolve, reject) {
        try {
            bcrypt_1.default.hash(password, 10, (error, hash) => {
                error && reject(error);
                resolve(hash);
            });
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.HashPassword = HashPassword;
function GenerateId() {
    return (0, uuid_1.v4)().toString();
}
exports.GenerateId = GenerateId;
function VerifyPassword(password = "", hpassword = "") {
    return new Promise(function (resolve, reject) {
        try {
            bcrypt_1.default.compare(password, hpassword, (error, match) => {
                error && reject(error);
                resolve(match);
            });
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.VerifyPassword = VerifyPassword;
