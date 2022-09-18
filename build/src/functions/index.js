"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConvertToDataURL = exports.UploadImage = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const configuration_1 = require("../configuration");
function UploadImage(file) {
    return new Promise(function (resolve, reject) {
        try {
            cloudinary_1.default.v2.uploader.upload(file, Object.assign(Object.assign({}, configuration_1.cloudinaryConfiguration), { folder: "eventshub" }), (error, results) => {
                error && reject(error);
                resolve(results);
            });
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.UploadImage = UploadImage;
function ConvertToDataURL(file) {
    return new Promise(function (resolve, reject) {
        try {
            resolve(Buffer.from(file).toString("base64"));
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.ConvertToDataURL = ConvertToDataURL;
