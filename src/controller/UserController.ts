import { IAuthModel, ICommentModel, IUserModel } from "./../interface/index";
import { Request, Response } from "express";
import {
  AddNewUser,
  GetUserByEmailAddress,
  GetUserById,
  GetUsers,
  UpdateUserInfo,
} from "../services/UserServices";
import {
  AddAuthInfo,
  GetAuthInfoByUserId,
  UpdateAuthInfo,
} from "../services/AuthServices";
import {
  GenerateId,
  GenerateOTP,
  HashPassword,
  VerifyPassword,
} from "../utilities";
import { AddComment } from "../services/ReviewServices";
import { SendMail } from "../services/MailServices";
import { html } from "./AuthController";

interface ILoginParams {
  email: string;
  password: string;
}
interface IUserInfo extends IUserModel {
  _id: string;
}
interface IRegisterInfo extends IUserModel {
  password: string;
}
export async function UserLoginController(req: Request, res: Response) {
  try {
    const data: ILoginParams = req.body;
    const user = await GetUserByEmailAddress<IUserInfo | null>(data.email);
    if (user) {
      const authInfo = await GetAuthInfoByUserId<IAuthModel | null>(user._id);
      if (authInfo) {
        const match = await VerifyPassword(data.password, authInfo.password);
        if (match) {
          if (Boolean(user.status)) {
            res.send(user);
          } else {
            res.status(400).send("Account Inactive, Access Denied");
          }
        } else {
          res.status(400).send("Icorrect Login Password,Access Denied");
        }
      } else {
        res.status(404).send("Invalid Login Email Address");
      }
    } else {
      res.status(404).send("Invalid Login Email Address");
    }
  } catch (error) {
    res.status(401).send(error);
  }
}

export async function UserRegisterController(req: Request, res: Response) {
  try {
    const info: IRegisterInfo = req.body;
    info.id = GenerateId();
    const otp = GenerateOTP();
    await SendMail({
      receiver: [info.email],
      subject: "Account Verification Code",
      text: `You account verification code is ${otp}`,
      html: html(
        otp,
        req.headers.origin
          ? req.headers.origin + `/account/email/verify/${info.id}`
          : ""
      ),
    });
    const User = await AddNewUser<IUserInfo>(info);
    const authInfo: IAuthModel = {
      password: await HashPassword(info.password),
      otp,
      userId: User._id,
    };
    await AddAuthInfo(authInfo);
    res.send(User);
  } catch (error) {
    console.log(error);
    res.status(401).send(error);
  }
}

export async function GetUsersController(req: Request, res: Response) {
  try {
    const data = await GetUsers<IUserInfo[]>();
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(401).send(error);
  }
}

export async function AdminUserInfoUpdateController(
  req: Request,
  res: Response
) {
  try {
    const info: IUserModel = req.body;
    await UpdateUserInfo(info);
    res.send(await GetUsers());
  } catch (error) {
    res.status(404).send(error);
  }
}

interface IOTPVerificationParams {
  id: string;
  otp: string;
  password: string;
}
export async function VerifyUserOTPController(req: Request, res: Response) {
  try {
    const data: IOTPVerificationParams = req.body;
    const userInfo = await GetUserById<IUserInfo | null>(data.id);

    if (userInfo) {
      const authInfo = await GetAuthInfoByUserId<IAuthModel | null>(
        userInfo._id
      );
      if (authInfo && Boolean(data.otp === authInfo.otp)) {
        userInfo.authenticated = 1;

        await UpdateUserInfo(userInfo);
        res.send(userInfo);
      } else {
        res.status(400).send("Invalid OTP");
      }
    } else {
      res.status(400).send("Invalid User Details,Access Denied");
    }
  } catch (error) {
    console.log(error);
    res.status(401).send(error);
  }
}

export async function AddUserCommentController(req: Request, res: Response) {
  try {
    const info: ICommentModel = req.body;
    await AddComment(info);
    res.send("Review Submitted Successfully");
  } catch (error) {
    res.status(404).send(error);
  }
}

export async function GetUserByEmailController(req: Request, res: Response) {
  try {
    const { email } = req.query;

    if (email) {
      const Info = await GetUserById(email as string);
      if (Info) {
        res.send(Info);
      } else {
        res.status(404).send("User not found!!");
      }
    } else {
      res.status(404).send("User not found!!");
    }
  } catch (error) {
    res.status(404).send(error);
  }
}
