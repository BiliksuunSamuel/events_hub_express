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
exports.ChangeUserPasswordMiddleWare = void 0;
const UserServices_1 = require("../services/UserServices");
function ChangeUserPasswordMiddleWare(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const info = req.body;
            const Info = yield (0, UserServices_1.GetUserByEmailAddress)(info.email);
            if (!Info) {
                return res.status(404).send("Invalid Email Address, Check and Try Again");
            }
            next();
        }
        catch (error) {
            res.status(404).send(error);
        }
    });
}
exports.ChangeUserPasswordMiddleWare = ChangeUserPasswordMiddleWare;
