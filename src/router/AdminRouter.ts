import { PostRoutes, GetRoutes } from "./../routes/index";
import express from "express";
import {
  AdminLoginController,
  AdminRegisterController,
  GetAdminAccountsController,
  UpdateAdminInfoController,
} from "../controller/AdminController";
import {
  AddAdminMiddleWare,
  UpdateAdminInfoMiddleWare,
} from "../middleware/AdminMiddleWare";
import { UserInfoUpdateMiddleWare } from "../middleware/UserMiddleware";
import { AdminUserInfoUpdateController } from "../controller/UserController";

const Router = express.Router();

Router.post(PostRoutes.admin_login, AdminLoginController);
Router.post(
  PostRoutes.admin_register,
  AddAdminMiddleWare,
  AdminRegisterController
);
Router.post(
  PostRoutes.amdin_account_update,
  UpdateAdminInfoMiddleWare,
  UpdateAdminInfoController
);
Router.post(
  PostRoutes.user_status_update,
  UserInfoUpdateMiddleWare,
  AdminUserInfoUpdateController
);
//
Router.get(GetRoutes.accounts_get, GetAdminAccountsController);
export default Router;
