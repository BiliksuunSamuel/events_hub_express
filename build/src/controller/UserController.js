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
exports.GetUserByEmailController = exports.AddUserCommentController = exports.VerifyUserOTPController = exports.AdminUserInfoUpdateController = exports.GetUsersController = exports.UserRegisterController = exports.UserLoginController = void 0;
const UserServices_1 = require("../services/UserServices");
const AuthServices_1 = require("../services/AuthServices");
const utilities_1 = require("../utilities");
const ReviewServices_1 = require("../services/ReviewServices");
const MailServices_1 = require("../services/MailServices");
const AuthController_1 = require("./AuthController");
function UserLoginController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = req.body;
            const user = yield (0, UserServices_1.GetUserByEmailAddress)(data.email);
            if (user) {
                const authInfo = yield (0, AuthServices_1.GetAuthInfoByUserId)(user._id);
                if (authInfo) {
                    const match = yield (0, utilities_1.VerifyPassword)(data.password, authInfo.password);
                    if (match) {
                        if (Boolean(user.status)) {
                            res.send(user);
                        }
                        else {
                            res.status(400).send("Account Inactive, Access Denied");
                        }
                    }
                    else {
                        res.status(400).send("Icorrect Login Password,Access Denied");
                    }
                }
                else {
                    res.status(404).send("Invalid Login Email Address");
                }
            }
            else {
                res.status(404).send("Invalid Login Email Address");
            }
        }
        catch (error) {
            res.status(401).send(error);
        }
    });
}
exports.UserLoginController = UserLoginController;
function UserRegisterController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const info = req.body;
            info.id = (0, utilities_1.GenerateId)();
            const otp = (0, utilities_1.GenerateOTP)();
            yield (0, MailServices_1.SendMail)({
                receiver: [info.email],
                subject: "Account Verification Code",
                text: `You account verification code is ${otp}`,
                html: (0, AuthController_1.html)(otp, req.headers.origin
                    ? req.headers.origin + `/account/email/verify/${info.id}`
                    : ""),
            });
            const User = yield (0, UserServices_1.AddNewUser)(info);
            const authInfo = {
                password: yield (0, utilities_1.HashPassword)(info.password),
                otp,
                userId: User._id,
            };
            yield (0, AuthServices_1.AddAuthInfo)(authInfo);
            res.send(User);
        }
        catch (error) {
            console.log(error);
            res.status(401).send(error);
        }
    });
}
exports.UserRegisterController = UserRegisterController;
function GetUsersController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, UserServices_1.GetUsers)();
            res.send(data);
        }
        catch (error) {
            console.log(error);
            res.status(401).send(error);
        }
    });
}
exports.GetUsersController = GetUsersController;
function AdminUserInfoUpdateController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const info = req.body;
            yield (0, UserServices_1.UpdateUserInfo)(info);
            res.send(yield (0, UserServices_1.GetUsers)());
        }
        catch (error) {
            res.status(404).send(error);
        }
    });
}
exports.AdminUserInfoUpdateController = AdminUserInfoUpdateController;
function VerifyUserOTPController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = req.body;
            const userInfo = yield (0, UserServices_1.GetUserById)(data.id);
            if (userInfo) {
                const authInfo = yield (0, AuthServices_1.GetAuthInfoByUserId)(userInfo._id);
                if (authInfo && Boolean(data.otp === authInfo.otp)) {
                    userInfo.authenticated = 1;
                    yield (0, UserServices_1.UpdateUserInfo)(userInfo);
                    res.send(userInfo);
                }
                else {
                    res.status(400).send("Invalid OTP");
                }
            }
            else {
                res.status(400).send("Invalid User Details,Access Denied");
            }
        }
        catch (error) {
            console.log(error);
            res.status(401).send(error);
        }
    });
}
exports.VerifyUserOTPController = VerifyUserOTPController;
function AddUserCommentController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const info = req.body;
            yield (0, ReviewServices_1.AddComment)(info);
            res.send("Review Submitted Successfully");
        }
        catch (error) {
            res.status(404).send(error);
        }
    });
}
exports.AddUserCommentController = AddUserCommentController;
function GetUserByEmailController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email } = req.query;
            if (email) {
                const Info = yield (0, UserServices_1.GetUserById)(email);
                if (Info) {
                    res.send(Info);
                }
                else {
                    res.status(404).send("User not found!!");
                }
            }
            else {
                res.status(404).send("User not found!!");
            }
        }
        catch (error) {
            res.status(404).send(error);
        }
    });
}
exports.GetUserByEmailController = GetUserByEmailController;
