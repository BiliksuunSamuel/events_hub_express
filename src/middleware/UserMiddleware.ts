import { NextFunction, Request, Response } from "express";
import { IUserModel } from "../interface";
import {
  GetUserByEmailAddress,
  GetUserById,
  GetUserByUsername,
} from "../services/UserServices";

export async function UserInfoUpdateMiddleWare(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const info: IUserModel = req.body;
    const Info = await GetUserById(info.id);
    if (!Info) {
      return res.status(404).send("User Not Found, Operation Failed!!!");
    }
    next();
  } catch (error) {
    res.status(404).send(error);
  }
}

export async function RegisterUserMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const info: IUserModel = req.body;
    const usernameInfo = await GetUserByUsername(info.username);
    if (usernameInfo) {
      return res.status(404).send(`Username ${info.username} is Already taken`);
    } else {
      const emailInfo = await GetUserByEmailAddress(info.email);
      if (emailInfo) {
        return res
          .status(404)
          .send(`Email Address ${info.email} Is Already Registered`);
      }
      next();
    }
  } catch (error) {
    res.status(404).send(error);
  }
}
