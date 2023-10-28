"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatchAsyncError = void 0;
const CatchAsyncError = (func) => (req, res, next) => {
    Promise.resolve(func(req, res, next).catch(next));
};
exports.CatchAsyncError = CatchAsyncError;
