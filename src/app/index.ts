import express from "express";
import cors from "cors";
import "../database";
import fileUpload from "express-fileupload";
import Router, { AdminRouter, EventsRouter, UserRouter } from "../router";
import moment from "moment";
import { GenerateId } from "../utilities";
//
const app = express();

//
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.urlencoded({ extended: true, limit: "100mb" }));

//
app.use(UserRouter);
app.use(AdminRouter);
app.use(Router);
app.use(EventsRouter);
//
console.log(GenerateId());

export default app;
