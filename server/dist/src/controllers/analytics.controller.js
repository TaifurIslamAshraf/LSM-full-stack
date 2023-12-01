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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderAnalytics = exports.getCourseAnalytics = exports.getUserAnalytics = void 0;
const analytics_generator_1 = require("../helpers/analytics.generator");
const catchAsyncErrors_1 = require("../middlewares/catchAsyncErrors");
const course_model_1 = __importDefault(require("../models/course.model"));
const order_model_1 = require("../models/order.model");
const user_model_1 = __importDefault(require("../models/user.model"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
//get users analytics
exports.getUserAnalytics = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, analytics_generator_1.generateAnalytics)(user_model_1.default);
        res.status(200).json({
            success: true,
            userAnalytics: user,
        });
    }
    catch (error) {
        return next(new errorHandler_1.default(error.message, 500));
    }
}));
//get courses analytics
exports.getCourseAnalytics = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = yield (0, analytics_generator_1.generateAnalytics)(course_model_1.default);
        res.status(200).json({
            success: true,
            courseAnalytics: course,
        });
    }
    catch (error) {
        return next(new errorHandler_1.default(error.message, 500));
    }
}));
//get courses analytics
exports.getOrderAnalytics = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield (0, analytics_generator_1.generateAnalytics)(order_model_1.OrderModel);
        res.status(200).json({
            success: true,
            orderAnalytics: order,
        });
    }
    catch (error) {
        return next(new errorHandler_1.default(error.message, 500));
    }
}));
