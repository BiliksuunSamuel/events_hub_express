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
exports.AuthRouter = exports.EventsRouter = exports.AdminRouter = exports.UserRouter = void 0;
const express_1 = __importDefault(require("express"));
const Router = express_1.default.Router();
var UserRouter_1 = require("./UserRouter");
Object.defineProperty(exports, "UserRouter", { enumerable: true, get: function () { return __importDefault(UserRouter_1).default; } });
var AdminRouter_1 = require("./AdminRouter");
Object.defineProperty(exports, "AdminRouter", { enumerable: true, get: function () { return __importDefault(AdminRouter_1).default; } });
var EventRouter_1 = require("./EventRouter");
Object.defineProperty(exports, "EventsRouter", { enumerable: true, get: function () { return __importDefault(EventRouter_1).default; } });
var AuthRouter_1 = require("./AuthRouter");
Object.defineProperty(exports, "AuthRouter", { enumerable: true, get: function () { return __importDefault(AuthRouter_1).default; } });
Router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send({
            Name: "EventsHub",
            Developer: "BiliksuunSamuel",
        });
    }
    catch (error) {
        res.status(404).send(error);
    }
}));
exports.default = Router;
