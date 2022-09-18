import express from "express";
import { ChangeUserPasswordController } from "../controller/AuthController";
import { ChangeUserPasswordMiddleWare } from "../middleware/AuthMiddleWare";
import { PostRoutes } from "../routes";

const Router = express.Router();

//
Router.post(
  PostRoutes.user_password_reset,
  ChangeUserPasswordMiddleWare,
  ChangeUserPasswordController
);
//

export default Router;
