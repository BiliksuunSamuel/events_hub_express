"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCommentControllerMiddleWare = void 0;
const Validation_1 = require("../utilities/Validation");
function AddCommentControllerMiddleWare(req, res, next) {
    try {
        const info = req.body;
        (0, Validation_1.ValidateCommentInfo)(info);
        next();
    }
    catch (error) {
        res.status(404).send(error);
    }
}
exports.AddCommentControllerMiddleWare = AddCommentControllerMiddleWare;
