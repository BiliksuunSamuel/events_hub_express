import {
  IAdminModel,
  ICommentModel,
  IEventModel,
  IUserModel,
} from "../interface";

export function ValidateEventInfo(info: IEventModel) {
  if (info.headline.length <= 0) {
    throw "Event Header Required";
  }
  if (info.description.length <= 0) {
    throw "Event Description Required";
  }
  if (info.eventDate.length <= 0) {
    throw "Select Event Data";
  }
  if (info.eventTime.length <= 0) {
    throw "Event Time Required";
  }
}

export function ValidateAdminInfo(info: IAdminModel) {
  if (info.username.length < 4) {
    throw "User Name Too Short,Minimum of 5 Characters Required";
  }
  if (info.email.length <= 0) {
    throw "Invalid Email Address";
  }
}

export function ValidateUserInfo(info: IUserModel) {
  if (info.username.length < 4) {
    throw "user Name Too Short, Minimumn of 4 Characters Required";
  }
  if (info.email.length <= 0) {
    throw "Invalid Email Address";
  }
}

export function ValidateCommentInfo(info: ICommentModel) {
  if (info.text.length <= 0) {
    throw "Message Required";
  }
  if (info.userEmail.length <= 0) {
    throw "Access Denied Operation Failed";
  }
}
