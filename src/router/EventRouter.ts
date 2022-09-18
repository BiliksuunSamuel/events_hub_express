import { PostRoutes } from "./../routes/index";
import express from "express";
import {
  AddEventController,
  DeleteEventController,
  GetEventsController,
  UpdateEventInfoController,
  UpdateEventStatusController,
} from "../controller/EventsController";
import { GetRoutes } from "../routes";
import {
  DeleteEventControllerMiddleware,
  UpdateEventControllerMiddleware,
  UpdateEventStatusControllerMiddleWare,
  ValidateEventInfoMiddleWare,
} from "../middleware/EventsMiddleWare";

const Router = express.Router();

Router.post(
  PostRoutes.events_add,
  ValidateEventInfoMiddleWare,
  AddEventController
);
Router.post(
  PostRoutes.event_info_update,
  UpdateEventControllerMiddleware,
  UpdateEventInfoController
);
Router.post(
  PostRoutes.event_status_update,
  UpdateEventStatusControllerMiddleWare,
  UpdateEventStatusController
);
Router.post(
  PostRoutes.event_delete,
  DeleteEventControllerMiddleware,
  DeleteEventController
);
///
Router.get(GetRoutes.events_get, GetEventsController);
export default Router;
