"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAuthInfo = exports.GetAuthInfoByUserId = exports.AddAuthInfo = void 0;
const index_1 = require("./../database/model/index");
//add auth info
function AddAuthInfo(info) {
    return new Promise(function (resolve, reject) {
        try {
            const Info = new index_1.AuthModel(info);
            Info.validate()
                .then(() => {
                Info.save();
                resolve(Info);
            })
                .catch((error) => reject(error));
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.AddAuthInfo = AddAuthInfo;
function GetAuthInfoByUserId(id) {
    return new Promise(function (resolve, reject) {
        try {
            index_1.AuthModel.findOne({ userId: id }, (error, results) => {
                error && reject(error);
                resolve(results);
            });
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.GetAuthInfoByUserId = GetAuthInfoByUserId;
function UpdateAuthInfo(info) {
    return new Promise(function (resolve, reject) {
        try {
            index_1.AuthModel.findOneAndUpdate({ userId: info.userId }, { password: info.password, otp: info.otp }, (error) => {
                error && reject(error);
                resolve(true);
            });
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.UpdateAuthInfo = UpdateAuthInfo;
