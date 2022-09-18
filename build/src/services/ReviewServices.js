"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddComment = exports.GetComments = void 0;
const model_1 = require("../database/model");
function GetComments() {
    return new Promise(function (resolve, reject) {
        try {
            model_1.CommentModel.find((error, results) => {
                error && reject(error);
                resolve(results);
            });
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.GetComments = GetComments;
function AddComment(info) {
    return new Promise(function (resolve, reject) {
        try {
            const Info = new model_1.CommentModel(info);
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
exports.AddComment = AddComment;
