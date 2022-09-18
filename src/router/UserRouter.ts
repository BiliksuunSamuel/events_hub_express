import { PostRoutes, GetRoutes } from "./../routes/index";
import express from "express";
import {
  AddUserCommentController,
  GetUserByEmailController,
  GetUsersController,
  UserLoginController,
  UserRegisterController,
  VerifyUserOTPController,
} from "../controller/UserController";
import { AddCommentControllerMiddleWare } from "../middleware";
import { RegisterUserMiddleware } from "../middleware/UserMiddleware";

const Router = express.Router();

Router.post(PostRoutes.account_login, UserLoginController);
Router.post(
  PostRoutes.account_register,
  RegisterUserMiddleware,
  UserRegisterController
);
Router.post(PostRoutes.email_authentication, VerifyUserOTPController);
Router.post(
  PostRoutes.user_comments_add,
  AddCommentControllerMiddleWare,
  AddUserCommentController
);

//
Router.get(GetRoutes.users_get, GetUsersController);
Router.get(GetRoutes.get_user_by_email, GetUserByEmailController);

export default Router;
