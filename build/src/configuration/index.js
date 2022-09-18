"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinaryConfiguration = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const cloudinary_1 = __importDefault(require("cloudinary"));
dotenv_1.default.config();
exports.cloudinaryConfiguration = cloudinary_1.default.v2.config({
    cloud_name: "bhills",
    api_key: "332227748632362",
    api_secret: "DbNdOWLRZ_Xm96Hj--ns1149k20",
});
exports.default = {
    port: process.env.PORT || process.env.port,
    dbURL: process.env.dbURL ||
        "mongodb+srv://samuelbills:77045109@cluster0.nakki.mongodb.net/eventshub",
    mailHost: process.env.mailHost,
    mailPassword: process.env.mailPassword || "jtzmzcvqiypfvbjz",
    mailPort: 587,
    mailUser: process.env.mailUser,
};
