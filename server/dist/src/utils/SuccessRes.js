"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const successRes = (res, statusCode, data) => {
    res.status(statusCode).json(data);
};
exports.default = successRes;
