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
exports.DeleteEvent = exports.GetEvents = exports.UpdateEventInfo = exports.GetEventById = exports.AddEvent = void 0;
const index_1 = require("./../database/model/index");
function AddEvent(info) {
    return new Promise(function (resolve, reject) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Info = new index_1.EventModel(info);
                yield Info.save();
                resolve(Info);
            }
            catch (error) {
                reject(error);
            }
        });
    });
}
exports.AddEvent = AddEvent;
function GetEventById(id) {
    return new Promise((resolve, reject) => {
        try {
            index_1.EventModel.findOne({ id }, (error, results) => {
                error && reject(error);
                resolve(results);
            });
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.GetEventById = GetEventById;
function UpdateEventInfo(info) {
    return new Promise(function (resolve, reject) {
        try {
            index_1.EventModel.findOneAndUpdate({ id: info.id }, Object.assign({}, info), (error) => {
                error && reject(error);
                resolve(true);
            });
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.UpdateEventInfo = UpdateEventInfo;
function GetEvents() {
    return new Promise(function (resolve, reject) {
        try {
            index_1.EventModel.find((error, results) => {
                error && reject(error);
                resolve(results);
            });
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.GetEvents = GetEvents;
function DeleteEvent(id) {
    return new Promise(function (resolve, reject) {
        try {
            index_1.EventModel.findOneAndDelete({ id }, (error) => {
                error && reject(error);
                resolve(true);
            });
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.DeleteEvent = DeleteEvent;
