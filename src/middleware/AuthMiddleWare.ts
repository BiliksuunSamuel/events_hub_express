import { NextFunction, Request, Response } from "express";
import { IChangePasswordInfo } from "../controller/AuthController";
import { GetUserByEmailAddress } from "../services/UserServices";

export async function ChangeUserPasswordMiddleWare(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const info: IChangePasswordInfo = req.body;
    const Info = await GetUserByEmailAddress(info.email);
    if (!Info) {
      return res.status(404).send("Invalid Email Address, Check and Try Again");
    }
    next();
  } catch (error) {
    res.status(404).send(error);
  }
}
