import { PostRoutes } from "./../routes/index";
import express from "express";
import {
  AddEventController,
  GetEventsController,
} from "../controller/EventsController";
import { GetRoutes } from "../routes";

const Router = express.Router();

Router.post(PostRoutes.events_add, AddEventController);
///
Router.get(GetRoutes.events_get, GetEventsController);
export default Router;
