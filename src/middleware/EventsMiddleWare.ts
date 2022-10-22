import { json, NextFunction, Request, Response } from "express";
import { FileArray } from "express-fileupload";
import { IEventModel } from "../interface";
import { GetEventById } from "../services/EventServices";
import { ValidateEventInfo } from "../utilities/Validation";

export async function ValidateEventInfoMiddleWare(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const info: IEventModel = JSON.parse(req.body.info);
    const files: FileArray | null | undefined = req.files;
    ValidateEventInfo(info);
    next();
  } catch (error) {
    res.status(404).send(error);
  }
}

export async function DeleteEventControllerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { eventId } = req.body;

    const Info = await GetEventById(eventId);
    if (!Info) {
      return res.status(404).send("Record Not Found, Operation Failed");
    }
    next();
  } catch (error) {
    res.status(404).send(error);
  }
}

export async function UpdateEventControllerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const info: IEventModel = JSON.parse(req.body.info);
    const Info = await GetEventById(info.id);

    if (!Info) {
      return res.status(404).send("Record Not Found, Operation Failed");
    }
    next();
  } catch (error) {
    res.status(404).send(error);
  }
}

export async function UpdateEventStatusControllerMiddleWare(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const info: IEventModel = req.body;
    const Info = await GetEventById<IEventModel | null>(info.id);
    if (!Info) {
      return res.status(404).send("Record Not Found, Update Failed");
    }
    next();
  } catch (error) {
    res.status(404).send(error);
  }
}
