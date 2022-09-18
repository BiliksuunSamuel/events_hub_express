"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../controller/AuthController");
const AuthMiddleWare_1 = require("../middleware/AuthMiddleWare");
const routes_1 = require("../routes");
const Router = express_1.default.Router();
//
Router.post(routes_1.PostRoutes.user_password_reset, AuthMiddleWare_1.ChangeUserPasswordMiddleWare, AuthController_1.ChangeUserPasswordController);
//
exports.default = Router;
