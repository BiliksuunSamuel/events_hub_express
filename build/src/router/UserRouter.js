"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./../routes/index");
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controller/UserController");
const middleware_1 = require("../middleware");
const UserMiddleware_1 = require("../middleware/UserMiddleware");
const Router = express_1.default.Router();
Router.post(index_1.PostRoutes.account_login, UserController_1.UserLoginController);
Router.post(index_1.PostRoutes.account_register, UserMiddleware_1.RegisterUserMiddleware, UserController_1.UserRegisterController);
Router.post(index_1.PostRoutes.email_authentication, UserController_1.VerifyUserOTPController);
Router.post(index_1.PostRoutes.user_comments_add, middleware_1.AddCommentControllerMiddleWare, UserController_1.AddUserCommentController);
//
Router.get(index_1.GetRoutes.users_get, UserController_1.GetUsersController);
Router.get(index_1.GetRoutes.get_user_by_email, UserController_1.GetUserByEmailController);
exports.default = Router;
