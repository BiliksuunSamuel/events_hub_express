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
exports.UpdateAdminInfoMiddleWare = exports.AddAdminMiddleWare = void 0;
const AdminServices_1 = require("../services/AdminServices");
const Validation_1 = require("../utilities/Validation");
function AddAdminMiddleWare(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const info = req.body;
            (0, Validation_1.ValidateAdminInfo)(info);
            const emailInfo = yield (0, AdminServices_1.GetAdminByEmail)(info.email);
            if (emailInfo) {
                return res.status(404).send("Email Address Already Taken");
            }
            next();
        }
        catch (error) {
            res.status(404).send(error);
        }
    });
}
exports.AddAdminMiddleWare = AddAdminMiddleWare;
function UpdateAdminInfoMiddleWare(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const info = req.body;
            const emailInfo = yield (0, AdminServices_1.GetAdminByEmail)(info.email);
            if (!emailInfo) {
                return res.status(404).send("Account Not Found!!!");
            }
            next();
        }
        catch (error) {
            res.status(404).send(error);
        }
    });
}
exports.UpdateAdminInfoMiddleWare = UpdateAdminInfoMiddleWare;
