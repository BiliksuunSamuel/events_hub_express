import { PostRoutes, GetRoutes } from "./../routes/index";
import express from "express";
import {
  GetUsersController,
  UserLoginController,
  UserRegisterController,
  VerifyUserOTPController,
} from "../controller/UserController";

const Router = express.Router();

Router.post(PostRoutes.account_login, UserLoginController);
Router.post(PostRoutes.account_register, UserRegisterController);
Router.post(PostRoutes.email_authentication, VerifyUserOTPController);

//
Router.get(GetRoutes.users_get, GetUsersController);

export default Router;
