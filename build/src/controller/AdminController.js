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
exports.UpdateAdminInfoController = exports.GetAdminAccountsController = exports.AdminRegisterController = exports.AdminLoginController = void 0;
const AdminServices_1 = require("../services/AdminServices");
const AuthServices_1 = require("../services/AuthServices");
const utilities_1 = require("../utilities");
function AdminLoginController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = req.body;
            const Info = yield (0, AdminServices_1.GetAdminByEmail)(data.email);
            if (Info) {
                const authInfo = yield (0, AuthServices_1.GetAuthInfoByUserId)(Info._id);
                if (authInfo) {
                    const match = yield (0, utilities_1.VerifyPassword)(data.password, authInfo.password);
                    if (match) {
                        if (Boolean(Info.status)) {
                            res.send(Object.assign(Object.assign({}, Info), { id: Info._id }));
                        }
                        else {
                            res.status(400).send("Account Inactive, Please Contact Your Admin");
                        }
                    }
                    else {
                        res.status(400).send("Incorrect Login Password");
                    }
                }
                else {
                    res.status(404).send("Invalid Email Address");
                }
            }
            else {
                res.status(404).send("Invalid Email Address");
            }
        }
        catch (error) {
            console.log(error);
            res.status(404).send(error);
        }
    });
}
exports.AdminLoginController = AdminLoginController;
function AdminRegisterController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const info = req.body;
            info.id = (0, utilities_1.GenerateId)();
            const Info = yield (0, AdminServices_1.GetAdminByEmail)(info.email);
            if (Info) {
                res.status(401).send("Email Address Already Registered");
            }
            else {
                const User = yield (0, AdminServices_1.AddAdminInfo)(info);
                const authInfo = {
                    password: yield (0, utilities_1.HashPassword)(info.password),
                    otp: (0, utilities_1.GenerateOTP)(),
                    userId: User._id,
                };
                yield (0, AuthServices_1.AddAuthInfo)(authInfo);
                res.send(Object.assign(Object.assign({}, User), { id: User._id }));
            }
        }
        catch (error) {
            console.log(error);
            res.status(404).send(error);
        }
    });
}
exports.AdminRegisterController = AdminRegisterController;
function GetAdminAccountsController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, AdminServices_1.GetAdmins)();
            res.send(data.map((d) => {
                return Object.assign(Object.assign({}, d), { id: d._id });
            }));
        }
        catch (error) {
            console.log(error);
            res.status(404).send(error);
        }
    });
}
exports.GetAdminAccountsController = GetAdminAccountsController;
function UpdateAdminInfoController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const info = req.body;
            yield (0, AdminServices_1.UpdateAdminInfo)(info);
        }
        catch (error) {
            res.status(404).send(error);
        }
    });
}
exports.UpdateAdminInfoController = UpdateAdminInfoController;
