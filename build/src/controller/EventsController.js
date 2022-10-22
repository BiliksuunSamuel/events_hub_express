"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteEventController = exports.UpdateEventStatusController = exports.UpdateEventInfoController = exports.AddEventController = exports.GetEventsController = void 0;
const moment_1 = __importDefault(require("moment"));
const functions_1 = require("../functions");
const EventServices_1 = require("../services/EventServices");
const utilities_1 = require("../utilities");
function GetEventsController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { year } = req.query;
            const data = yield (0, EventServices_1.GetEvents)();
            res.send(data.filter((d) => (0, moment_1.default)(d.dateAdded).format("YYYY") === year));
        }
        catch (error) {
            res.status(404).send(error);
        }
    });
}
exports.GetEventsController = GetEventsController;
function AddEventController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const info = JSON.parse(req.body.info);
            console.log(info);
            const files = req.files;
            if (files) {
                const fileObject = files.file;
                const dataUrl = yield (0, functions_1.ConvertToDataURL)(fileObject.data);
                const base64 = dataUrl.toString().split("\\")[0];
                const results = yield (0, functions_1.UploadImage)(`data:image/png;base64,${base64}`);
                info.image = results.url;
                info.id = (0, utilities_1.GenerateId)();
                const Info = yield (0, EventServices_1.AddEvent)(info);
                res.send("Event Added Successfully");
            }
            else {
                res.status(404).send("Event Image Required");
            }
        }
        catch (error) {
            console.log(error);
            res.status(404).send(error);
        }
    });
}
exports.AddEventController = AddEventController;
function UpdateEventInfoController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const info = JSON.parse(req.body.info);
            const files = req.files;
            if (files) {
                const fileObject = files.file;
                const dataUrl = yield (0, functions_1.ConvertToDataURL)(fileObject.data);
                const base64 = dataUrl.toString().split("\\")[0];
                const res = yield (0, functions_1.UploadImage)(`data:image/png;base64,${base64}`);
                info.image = res.url;
            }
            yield (0, EventServices_1.UpdateEventInfo)(info);
            res.send({
                data: yield (0, EventServices_1.GetEvents)(),
                message: "Event Info Updated Successfully",
            });
        }
        catch (error) {
            console.log(error);
            res.status(404).send(error);
        }
    });
}
exports.UpdateEventInfoController = UpdateEventInfoController;
function UpdateEventStatusController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const info = req.body;
            const Info = yield (0, EventServices_1.GetEventById)(info.id);
            if (Boolean(Info.status)) {
                Info.status = 0;
            }
            else {
                Info.status = 1;
            }
            yield (0, EventServices_1.UpdateEventInfo)(Info);
            res.send({ data: yield (0, EventServices_1.GetEvents)(), message: "Event Status Updated" });
        }
        catch (error) {
            res.status(404).send(error);
        }
    });
}
exports.UpdateEventStatusController = UpdateEventStatusController;
function DeleteEventController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { eventId } = req.body;
            yield (0, EventServices_1.DeleteEvent)(eventId);
            res.send({
                data: yield (0, EventServices_1.GetEvents)(),
                message: "Event Deleted Successfully",
            });
        }
        catch (error) {
            res.status(404).send(error);
        }
    });
}
exports.DeleteEventController = DeleteEventController;
