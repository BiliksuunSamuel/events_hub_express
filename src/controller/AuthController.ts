import { Request, Response } from "express";
import { IAuthModel, IUserModel } from "../interface";
import { GetAuthInfoByUserId, UpdateAuthInfo } from "../services/AuthServices";
import { SendMail } from "../services/MailServices";
import {
  GetUserByEmailAddress,
  UpdateUserInfo,
} from "../services/UserServices";
import { GenerateOTP, HashPassword } from "../utilities";

export interface IChangePasswordInfo {
  password: string;
  email: string;
  confirmPassword: string;
}

export async function ChangeUserPasswordController(
  req: Request,
  res: Response
) {
  try {
    const info: IChangePasswordInfo = req.body;
    const Info: any = await GetUserByEmailAddress(info.email);
    const authInfo: IAuthModel = await GetAuthInfoByUserId(Info._id);
    const otp = GenerateOTP();
    const originURL = req.headers.origin;
    const resePasswordURL = `${originURL}/account/email-verify/${Info.id}`;
    await SendMail({
      html: html(otp, resePasswordURL),
      receiver: [Info.email],
      text: "Change Account Password",
      subject: "Events Hub Account Settings",
    });
    Info.authenticated = 0;
    authInfo.otp = otp;
    authInfo.password = await HashPassword(info.password);
    await UpdateUserInfo(Info);
    await UpdateAuthInfo(authInfo);
    res.send(await GetUserByEmailAddress(info.email));
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
}

export const html = (otp: string, resetURL: string) => `
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
