"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const configuration_1 = __importDefault(require("../configuration"));
const Transporter = nodemailer_1.default.createTransport({
    port: configuration_1.default.mailPort,
    host: configuration_1.default.mailHost,
    secure: false,
    auth: {
        user: configuration_1.default.mailUser,
        pass: configuration_1.default.mailPassword,
    },
});
function SendMail(info) {
    return new Promise(function (resolve, reject) {
        try {
            Transporter.sendMail(Object.assign(Object.assign({}, info), { to: info.receiver }))
                .then((response) => resolve(response))
                .catch((error) => reject(error));
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.SendMail = SendMail;
