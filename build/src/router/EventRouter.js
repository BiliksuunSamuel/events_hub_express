"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./../routes/index");
const express_1 = __importDefault(require("express"));
const EventsController_1 = require("../controller/EventsController");
const routes_1 = require("../routes");
const EventsMiddleWare_1 = require("../middleware/EventsMiddleWare");
const Router = express_1.default.Router();
Router.post(index_1.PostRoutes.events_add, EventsMiddleWare_1.ValidateEventInfoMiddleWare, EventsController_1.AddEventController);
Router.post(index_1.PostRoutes.event_info_update, EventsMiddleWare_1.UpdateEventControllerMiddleware, EventsController_1.UpdateEventInfoController);
Router.post(index_1.PostRoutes.event_status_update, EventsMiddleWare_1.UpdateEventStatusControllerMiddleWare, EventsController_1.UpdateEventStatusController);
Router.post(index_1.PostRoutes.event_delete, EventsMiddleWare_1.DeleteEventControllerMiddleware, EventsController_1.DeleteEventController);
///
Router.get(routes_1.GetRoutes.events_get, EventsController_1.GetEventsController);
exports.default = Router;
