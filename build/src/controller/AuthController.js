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
exports.html = exports.ChangeUserPasswordController = void 0;
const AuthServices_1 = require("../services/AuthServices");
const MailServices_1 = require("../services/MailServices");
const UserServices_1 = require("../services/UserServices");
const utilities_1 = require("../utilities");
function ChangeUserPasswordController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const info = req.body;
            const Info = yield (0, UserServices_1.GetUserByEmailAddress)(info.email);
            const authInfo = yield (0, AuthServices_1.GetAuthInfoByUserId)(Info._id);
            const otp = (0, utilities_1.GenerateOTP)();
            const originURL = req.headers.origin;
            const resePasswordURL = `${originURL}/account/email/verify/${Info.id}`;
            yield (0, MailServices_1.SendMail)({
                html: (0, exports.html)(otp, resePasswordURL),
                receiver: [Info.email],
                text: "Change Account Password",
                subject: "Events Hub Account Settings",
            });
            Info.authenticated = 0;
            authInfo.otp = otp;
            authInfo.password = yield (0, utilities_1.HashPassword)(info.password);
            yield (0, UserServices_1.UpdateUserInfo)(Info);
            yield (0, AuthServices_1.UpdateAuthInfo)(authInfo);
            res.send(yield (0, UserServices_1.GetUserByEmailAddress)(info.email));
        }
        catch (error) {
            console.log(error);
            res.status(404).send(error);
        }
    });
}
exports.ChangeUserPasswordController = ChangeUserPasswordController;
const html = (otp, resetURL) => `
<!DOCTYPE html>
 <html>
 <head></head>
 <body>
<div style="padding:10px;box-shadow:1px 1px 1px 1px #d0d0d0;background:#fff">
<h5>Reset Account Password</h5>
  <p>Your email verification code is </p>
  <h4>${otp}</h4>
  <a href="${resetURL}">ResetPassword</a>
</div>
</body>
</html>
`;
exports.html = html;
