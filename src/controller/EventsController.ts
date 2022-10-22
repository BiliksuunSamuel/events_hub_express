import { Request, Response } from "express";
import { FileArray } from "express-fileupload";
import moment from "moment";
import { ConvertToDataURL, UploadImage } from "../functions";
import { IEventModel } from "../interface";
import {
  AddEvent,
  DeleteEvent,
  GetEventById,
  GetEvents,
  UpdateEventInfo,
} from "../services/EventServices";
import { GenerateId } from "../utilities";

export async function GetEventsController(req: Request, res: Response) {
  try {
    const { year } = req.query;

    const data = await GetEvents<IEventModel[]>();
    res.send(data.filter((d) => moment(d.dateAdded).format("YYYY") === year));
  } catch (error) {
    res.status(404).send(error);
  }
}

export async function AddEventController(req: Request, res: Response) {
  try {
    const info: IEventModel = JSON.parse(req.body.info);
    info.dateAdded = moment().format();
    console.log(info);
    const files: FileArray | null | undefined = req.files;
    if (files) {
      const fileObject: any = files.file;
      const dataUrl: any = await ConvertToDataURL(fileObject.data);
      const base64 = dataUrl.toString().split("\\")[0];
      const results = await UploadImage(`data:image/png;base64,${base64}`);
      info.image = results.url;
      info.id = GenerateId();
      const Info = await AddEvent(info);
      res.send("Event Added Successfully");
    } else {
      res.status(404).send("Event Image Required");
    }
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
}

export async function UpdateEventInfoController(req: Request, res: Response) {
  try {
    const info: IEventModel = JSON.parse(req.body.info);
    const files: FileArray | null | undefined = req.files;
    if (files) {
      const fileObject: any = files.file;
      const dataUrl: any = await ConvertToDataURL(fileObject.data);
      const base64 = dataUrl.toString().split("\\")[0];
      const res = await UploadImage(`data:image/png;base64,${base64}`);
      info.image = res.url;
    }
    await UpdateEventInfo(info);
    res.send({
      data: await GetEvents(),
      message: "Event Info Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
}

export async function UpdateEventStatusController(req: Request, res: Response) {
  try {
    const info: IEventModel = req.body;
    const Info: IEventModel = await GetEventById(info.id);
    if (Boolean(Info.status)) {
      Info.status = 0;
    } else {
      Info.status = 1;
    }
    await UpdateEventInfo(Info);
    res.send({ data: await GetEvents(), message: "Event Status Updated" });
  } catch (error) {
    res.status(404).send(error);
  }
}

export async function DeleteEventController(req: Request, res: Response) {
  try {
    const { eventId } = req.body;

    await DeleteEvent(eventId);
    res.send({
      data: await GetEvents(),
      message: "Event Deleted Successfully",
    });
  } catch (error) {
    res.status(404).send(error);
  }
}
