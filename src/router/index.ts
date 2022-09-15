import express, { Response, Request } from "express";
import { SendMail } from "../services/MailServices";

const Router = express.Router();

export { default as UserRouter } from "./UserRouter";
export { default as AdminRouter } from "./AdminRouter";
export { default as EventsRouter } from "./EventRouter";

Router.get("/", async (req: Request, res: Response) => {
  try {
    res.send({
      Name: "EventsHub",
      Developer: "BiliksuunSamuel",
    });
  } catch (error) {
    res.status(404).send(error);
  }
});

export default Router;
