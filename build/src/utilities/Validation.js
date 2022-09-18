"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateCommentInfo = exports.ValidateUserInfo = exports.ValidateAdminInfo = exports.ValidateEventInfo = void 0;
function ValidateEventInfo(info) {
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
exports.ValidateEventInfo = ValidateEventInfo;
function ValidateAdminInfo(info) {
    if (info.username.length < 4) {
        throw "User Name Too Short,Minimum of 5 Characters Required";
    }
    if (info.email.length <= 0) {
        throw "Invalid Email Address";
    }
}
exports.ValidateAdminInfo = ValidateAdminInfo;
function ValidateUserInfo(info) {
    if (info.username.length < 4) {
        throw "user Name Too Short, Minimumn of 4 Characters Required";
    }
    if (info.email.length <= 0) {
        throw "Invalid Email Address";
    }
}
exports.ValidateUserInfo = ValidateUserInfo;
function ValidateCommentInfo(info) {
    if (info.text.length <= 0) {
        throw "Message Required";
    }
    if (info.userEmail.length <= 0) {
        throw "Access Denied Operation Failed";
    }
}
exports.ValidateCommentInfo = ValidateCommentInfo;
