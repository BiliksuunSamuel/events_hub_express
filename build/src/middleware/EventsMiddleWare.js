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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEventStatusControllerMiddleWare = exports.UpdateEventControllerMiddleware = exports.DeleteEventControllerMiddleware = exports.ValidateEventInfoMiddleWare = void 0;
const functions_1 = require("../functions");
const EventServices_1 = require("../services/EventServices");
const Validation_1 = require("../utilities/Validation");
function ValidateEventInfoMiddleWare(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const info = req.body;
            const files = req.files;
            if (files) {
                const imageData = files.file.data;
                info.image = yield (yield (0, functions_1.UploadImage)(imageData)).url;
            }
            (0, Validation_1.ValidateEventInfo)(info);
            next();
        }
        catch (error) {
            res.status(404).send(error);
        }
    });
}
exports.ValidateEventInfoMiddleWare = ValidateEventInfoMiddleWare;
function DeleteEventControllerMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { eventId } = req.body;
            const Info = yield (0, EventServices_1.GetEventById)(eventId);
            if (!Info) {
                return res.status(404).send("Record Not Found, Operation Failed");
            }
            next();
        }
        catch (error) {
            res.status(404).send(error);
        }
    });
}
exports.DeleteEventControllerMiddleware = DeleteEventControllerMiddleware;
function UpdateEventControllerMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const info = req.body;
            const Info = yield (0, EventServices_1.GetEventById)(info.id);
            if (!Info) {
                return res.status(404).send("Record Not Found, Operation Failed");
            }
            next();
        }
        catch (error) {
            res.status(404).send(error);
        }
    });
}
exports.UpdateEventControllerMiddleware = UpdateEventControllerMiddleware;
function UpdateEventStatusControllerMiddleWare(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const info = req.body;
            const Info = yield (0, EventServices_1.GetEventById)(info.id);
            if (!Info) {
                return res.status(404).send("Record Not Found, Update Failed");
            }
            next();
        }
        catch (error) {
            res.status(404).send(error);
        }
    });
}
exports.UpdateEventStatusControllerMiddleWare = UpdateEventStatusControllerMiddleWare;
