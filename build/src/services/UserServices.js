"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserByUsername = exports.UpdateUserInfo = exports.ValidateUserInfo = exports.AddNewUser = exports.GetUsers = exports.GetUserById = exports.GetUserByEmailAddress = void 0;
const index_1 = require("./../database/model/index");
function GetUserByEmailAddress(email = "") {
    return new Promise(function (resolve, reject) {
        try {
            index_1.UserModel.findOne({ email }, (error, results) => {
                error && reject(error);
                resolve(results);
            });
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.GetUserByEmailAddress = GetUserByEmailAddress;
function GetUserById(id = "") {
    return new Promise(function (resolve, reject) {
        try {
            index_1.UserModel.findOne({ id }, (error, results) => {
                error && reject(error);
                resolve(results);
            });
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.GetUserById = GetUserById;
function GetUsers() {
    return new Promise(function (resolve, reject) {
        try {
            index_1.UserModel.find((error, results) => {
                error && reject(error);
                resolve(results);
            });
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.GetUsers = GetUsers;
function AddNewUser(info) {
    return new Promise(function (resolve, reject) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Info = new index_1.UserModel(info);
                yield Info.save();
                resolve(Info);
            }
            catch (error) {
                reject(error);
            }
        });
    });
}
exports.AddNewUser = AddNewUser;
function ValidateUserInfo(info) {
    return new Promise(function (resolver, reject) {
        index_1.UserModel.findOneAndUpdate({ email: info.email }, { authenticated: info.authenticated }, (error) => {
            error && reject(error);
            resolver(true);
        });
    });
}
exports.ValidateUserInfo = ValidateUserInfo;
function UpdateUserInfo(info) {
    return new Promise(function (resolve, reject) {
        try {
            index_1.UserModel.findOneAndUpdate({ id: info.id }, {
                role: info.role,
                status: info.status,
                username: info.username,
                email: info.email,
                authenticated: info.authenticated,
            }, (error) => {
                error && reject(error);
                resolve(true);
            });
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.UpdateUserInfo = UpdateUserInfo;
function GetUserByUsername(username) {
    return new Promise(function (resolve, reject) {
        try {
            index_1.UserModel.findOne({ username }, (error, results) => {
                error && reject(error);
                resolve(results);
            });
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.GetUserByUsername = GetUserByUsername;
