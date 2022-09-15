import { Request, Response } from "express";
import { FileArray } from "express-fileupload";
import moment from "moment";
import { ConvertToDataURL, UploadImage } from "../functions";
import { IEventModel } from "../interface";
import { AddEvent, GetEvents } from "../services/EventServices";
import { GenerateId } from "../utilities";

export async function GetEventsController(req: Request, res: Response) {
  try {
    const { year } = req.query;

    const data = await GetEvents<IEventModel[]>();
    res.send(
      data.map((d) => {
        if (moment(d.dateAdded).format("YYYY") === year) {
          return d;
        }
      })
    );
  } catch (error) {
    res.status(404).send(error);
  }
}

export async function AddEventController(req: Request, res: Response) {
  try {
    const info: IEventModel = req.body;
    const files: FileArray | null | undefined = req.files;

    if (files) {
      const fileObject: any = files.file;
      const dataUrl: any = await ConvertToDataURL(fileObject.data);
      const base64 = dataUrl.toString().split("\\")[0];
      const res = await UploadImage(`data:image/png;base64,${base64}`);
      info.image = res.url;
      info.id = GenerateId();
      const Info = await AddEvent(info);
      res.send("Event Added Successfully");
    } else {
      res.status(404).send("Event Image Required");
    }
  } catch (error) {
    res.status(404).send(error);
  }
}
