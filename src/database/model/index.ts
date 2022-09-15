import {
  UserSchema,
  AdminSchema,
  EventSchema,
  CommentSchema,
  AuthSchema,
} from "./../schema/index";
import mongoose from "mongoose";

export const UserModel = mongoose.model("user", UserSchema);
export const AdminModel = mongoose.model("admin", AdminSchema);
export const EventModel = mongoose.model("event", EventSchema);
export const CommentModel = mongoose.model("comment", CommentSchema);
export const AuthModel = mongoose.model("auth", AuthSchema);
