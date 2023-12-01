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
exports.getAllOrders = exports.createOrder = void 0;
const mongoose_1 = require("mongoose");
const catchAsyncErrors_1 = require("../middlewares/catchAsyncErrors");
const course_model_1 = __importDefault(require("../models/course.model"));
const notification_model_1 = require("../models/notification.model");
const order_model_1 = require("../models/order.model");
const user_model_1 = __importDefault(require("../models/user.model"));
const order_service_1 = require("../services/order.service");
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
exports.createOrder = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { courseId, payment_info } = req.body;
        const userId = (_a = res.locals.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!mongoose_1.Types.ObjectId.isValid(courseId)) {
            return next(new errorHandler_1.default("Invalid course id", 400));
        }
        const user = yield user_model_1.default.findById(userId);
        if (!user) {
            return next(new errorHandler_1.default("User not found", 404));
        }
        const courseExistInUser = user.course.some((item) => item._id.toString() === courseId);
        if (courseExistInUser) {
            return next(new errorHandler_1.default("You have alredy purchased this course", 400));
        }
        const course = yield course_model_1.default.findById(courseId);
        if (!course) {
            return next(new errorHandler_1.default("Course not found", 404));
        }
        const data = {
            courseId: course._id,
            userId: userId,
            payment_info,
        };
        const order = yield order_model_1.OrderModel.create(data);
        //send mail
        yield (0, order_service_1.orderService)(course, user, next);
        user.course.push(course._id);
        course.purchased = ((_b = course.purchased) !== null && _b !== void 0 ? _b : 0) + 1;
        yield notification_model_1.NotificationModel.create({
            userId: userId,
            title: "New Order",
            message: `Your order has been placed for ${course.name}`,
        });
        yield user.save();
        yield course.save();
        res.status(201).json({
            success: true,
            order,
        });
    }
    catch (error) {
        return next(new errorHandler_1.default(error.message, 500));
    }
}));
//get all orders -- admin
exports.getAllOrders = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_model_1.OrderModel.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            orders,
        });
    }
    catch (error) {
        return next(new errorHandler_1.default(error.message, 500));
    }
}));
