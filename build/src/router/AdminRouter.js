"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./../routes/index");
const express_1 = __importDefault(require("express"));
const AdminController_1 = require("../controller/AdminController");
const AdminMiddleWare_1 = require("../middleware/AdminMiddleWare");
const UserMiddleware_1 = require("../middleware/UserMiddleware");
const UserController_1 = require("../controller/UserController");
const Router = express_1.default.Router();
Router.post(index_1.PostRoutes.admin_login, AdminController_1.AdminLoginController);
Router.post(index_1.PostRoutes.admin_register, AdminMiddleWare_1.AddAdminMiddleWare, AdminController_1.AdminRegisterController);
Router.post(index_1.PostRoutes.amdin_account_update, AdminMiddleWare_1.UpdateAdminInfoMiddleWare, AdminController_1.UpdateAdminInfoController);
Router.post(index_1.PostRoutes.user_status_update, UserMiddleware_1.UserInfoUpdateMiddleWare, UserController_1.AdminUserInfoUpdateController);
//
Router.get(index_1.GetRoutes.accounts_get, AdminController_1.GetAdminAccountsController);
exports.default = Router;
