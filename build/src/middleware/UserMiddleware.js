"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUserMiddleware = exports.UserInfoUpdateMiddleWare = void 0;
const UserServices_1 = require("../services/UserServices");
function UserInfoUpdateMiddleWare(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const info = req.body;
            const Info = yield (0, UserServices_1.GetUserById)(info.id);
            if (!Info) {
                return res.status(404).send("User Not Found, Operation Failed!!!");
            }
            next();
        }
        catch (error) {
            res.status(404).send(error);
        }
    });
}
exports.UserInfoUpdateMiddleWare = UserInfoUpdateMiddleWare;
function RegisterUserMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const info = req.body;
            const usernameInfo = yield (0, UserServices_1.GetUserByUsername)(info.username);
            if (usernameInfo) {
                return res.status(404).send(`Username ${info.username} is Already taken`);
            }
            else {
                const emailInfo = yield (0, UserServices_1.GetUserByEmailAddress)(info.email);
                if (emailInfo) {
                    return res
                        .status(404)
                        .send(`Email Address ${info.email} Is Already Registered`);
                }
                (0, UserServices_1.ValidateUserInfo)(info);
                next();
            }
        }
        catch (error) {
            res.status(404).send(error);
        }
    });
}
exports.RegisterUserMiddleware = RegisterUserMiddleware;
