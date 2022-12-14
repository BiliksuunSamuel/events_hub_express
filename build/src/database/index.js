"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const configuration_1 = __importDefault(require("../configuration"));
exports.default = mongoose_1.default.connect(configuration_1.default.dbURL, { keepAlive: true }, (error) => {
    if (error) {
        throw error;
    }
    console.log("Database Connected");
});
