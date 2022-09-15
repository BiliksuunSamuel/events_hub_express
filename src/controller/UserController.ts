import { IAuthModel, IUserModel } from "./../interface/index";
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
    const user = await GetUserByEmailAddress<IUserInfo | null>(info.email);
    if (user) {
      res.status(400).send("Email Address Already Registered");
    } else {
      const User = await AddNewUser<IUserInfo>(info);
      const authInfo: IAuthModel = {
        password: await HashPassword(info.password),
        otp: GenerateOTP(),
        userId: User._id,
      };
      await AddAuthInfo(authInfo);
      res.send(User);
    }
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
      if (authInfo && Boolean(data.otp.trim() === authInfo.otp)) {
        userInfo.authenticated = 1;
        await UpdateUserInfo({ ...userInfo, status: 1 });
        res.send(userInfo);
      } else {
        res.status(400).send("Invalid User Details,Access Denied");
      }
    } else {
      res.status(400).send("Invalid User Details,Access Denied");
    }
  } catch (error) {
    console.log(error);
    res.status(401).send(error);
  }
}

{
  /*
                        I wish i can use you for all my Commit❤️ *messages,
                        it Bash❤️ me that i didn't meet you that early, i
                        would have made you my Main❤️ *branch, but nevertheless,
                        considering all the situations Pulling❤️ us apart, i 
                        will Push❤️ through with --force, *merge all issues,
                        challenges and make you the Master❤️ *branch,i will choose
                        to Clone❤️ you over and over, had all things been *clean,
                        you would have been my first and last *commitment.❤️❤️
*/
}
