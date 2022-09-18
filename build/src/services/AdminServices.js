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
exports.UpdateAdminInfo = exports.GetAdmins = exports.GetAdminById = exports.AddAdminInfo = exports.GetAdminByEmail = void 0;
const index_1 = require("./../database/model/index");
function GetAdminByEmail(email = "") {
    return new Promise(function (resolve, reject) {
        try {
            index_1.AdminModel.findOne({ email }, (error, results) => {
                error && reject(error);
                resolve(results);
            });
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.GetAdminByEmail = GetAdminByEmail;
function AddAdminInfo(info) {
    return new Promise(function (resolve, reject) {
        try {
            const Info = new index_1.AdminModel(info);
            Info.validate()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                yield Info.save();
                resolve(Info);
            }))
                .catch((error) => reject(error));
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.AddAdminInfo = AddAdminInfo;
function GetAdminById(id = "") {
    return new Promise(function (resolve, reject) {
        try {
            index_1.AdminModel.findOne({ id }, (error, results) => {
                error && reject(error);
                resolve(results);
            });
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.GetAdminById = GetAdminById;
function GetAdmins() {
    return new Promise(function (resolve, reject) {
        try {
            index_1.AdminModel.find((error, results) => {
                error && reject(error);
                resolve(results);
            });
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.GetAdmins = GetAdmins;
function UpdateAdminInfo(info) {
    return new Promise(function (resolve, reject) {
        try {
            index_1.AdminModel.findOneAndUpdate({ email: info.email }, Object.assign({}, info), (error) => {
                error && reject(error);
                resolve(true);
            });
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.UpdateAdminInfo = UpdateAdminInfo;
