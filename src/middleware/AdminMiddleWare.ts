import { NextFunction, Request, Response } from "express";
import { IAdminModel } from "../interface";
import { GetAdminByEmail } from "../services/AdminServices";
import { ValidateAdminInfo } from "../utilities/Validation";

export async function AddAdminMiddleWare(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const info: IAdminModel = req.body;
    ValidateAdminInfo(info);
    const emailInfo = await GetAdminByEmail(info.email);
    if (emailInfo) {
      return res.status(404).send("Email Address Already Taken");
    }
    next();
  } catch (error) {
    res.status(404).send(error);
  }
}

export async function UpdateAdminInfoMiddleWare(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const info: IAdminModel = req.body;
    const emailInfo = await GetAdminByEmail(info.email);
    if (!emailInfo) {
      return res.status(404).send("Account Not Found!!!");
    }
    next();
  } catch (error) {
    res.status(404).send(error);
  }
}
