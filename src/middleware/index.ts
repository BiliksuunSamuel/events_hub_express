import { NextFunction, Request, Response } from "express";
import { ICommentModel } from "../interface";
import { ValidateCommentInfo } from "../utilities/Validation";

export function AddCommentControllerMiddleWare(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const info: ICommentModel = req.body;
    ValidateCommentInfo(info);
    next();
  } catch (error) {
    res.status(404).send(error);
  }
}
