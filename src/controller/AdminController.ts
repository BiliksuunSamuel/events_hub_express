import { Request, Response } from "express";
import { IAdminModel, IAuthModel } from "../interface";
import {
  AddAdminInfo,
  GetAdminByEmail,
  GetAdmins,
} from "../services/AdminServices";
import { AddAuthInfo, GetAuthInfoByUserId } from "../services/AuthServices";
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
interface IAdminInfo extends IAdminModel {
  _id: string;
}

interface IRegisterParams extends IAdminModel {
  password: string;
}
export async function AdminLoginController(req: Request, res: Response) {
  try {
    const data: ILoginParams = req.body;
    const Info = await GetAdminByEmail<IAdminInfo | null>(data.email);
    if (Info) {
      const authInfo = await GetAuthInfoByUserId<IAuthModel | null>(Info._id);
      if (authInfo) {
        const match = await VerifyPassword(data.password, authInfo.password);
        if (match) {
          if (Boolean(Info.status)) {
            res.send({ ...Info, id: Info._id });
          } else {
            res.status(400).send("Account Inactive, Please Contact Your Admin");
          }
        } else {
          res.status(400).send("Incorrect Login Password");
        }
      } else {
        res.status(404).send("Invalid Email Address");
      }
    } else {
      res.status(404).send("Invalid Email Address");
    }
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
}

export async function AdminRegisterController(req: Request, res: Response) {
  try {
    const info: IRegisterParams = req.body;
    info.id = GenerateId();
    const Info = await GetAdminByEmail<IAdminInfo | null>(info.email);
    if (Info) {
      res.status(401).send("Email Address Already Registered");
    } else {
      const User = await AddAdminInfo<IAdminInfo>(info);
      const authInfo: IAuthModel = {
        password: await HashPassword(info.password),
        otp: GenerateOTP(),
        userId: User._id,
      };
      await AddAuthInfo(authInfo);
      res.send({ ...User, id: User._id });
    }
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
}

export async function GetAdminAccountsController(req: Request, res: Response) {
  try {
    const data = await GetAdmins<IAdminInfo[]>();
    res.send(
      data.map((d) => {
        return { ...d, id: d._id };
      })
    );
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
}
