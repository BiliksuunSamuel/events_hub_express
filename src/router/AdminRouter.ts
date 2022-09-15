import { PostRoutes, GetRoutes } from "./../routes/index";
import express from "express";
import {
  AdminLoginController,
  AdminRegisterController,
  GetAdminAccountsController,
} from "../controller/AdminController";

const Router = express.Router();

Router.post(PostRoutes.admin_login, AdminLoginController);
Router.post(PostRoutes.admin_register, AdminRegisterController);
//
Router.get(GetRoutes.accounts_get, GetAdminAccountsController);
export default Router;
