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
exports.updateNotificaton = exports.getAllNotifications = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const catchAsyncErrors_1 = require("../middlewares/catchAsyncErrors");
const notification_model_1 = require("../models/notification.model");
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
//get all notification -- user should be a admin
exports.getAllNotifications = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const AllNotifications = yield notification_model_1.NotificationModel.find().sort({
            createdAt: -1,
        });
        if (!AllNotifications) {
            return next(new errorHandler_1.default("Notification not found", 404));
        }
        res.status(200).json({
            success: true,
            AllNotifications,
        });
    }
    catch (error) {
        return next(new errorHandler_1.default(error.message, 500));
    }
}));
//update notification -- admin
exports.updateNotificaton = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const UpdatedNotification = yield notification_model_1.NotificationModel.findByIdAndUpdate(id, {
            status: "seen",
        }, { new: true });
        if (!UpdatedNotification) {
            return next(new errorHandler_1.default("Notification not found", 404));
        }
        const notification = yield notification_model_1.NotificationModel.find().sort({
            createdAt: -1,
        });
        res.status(200).json({
            success: true,
            notification,
        });
    }
    catch (error) {
        return next(new errorHandler_1.default(error.message, 500));
    }
}));
//delete notification
node_cron_1.default.schedule("0 0 0 * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    yield notification_model_1.NotificationModel.deleteMany({
        status: "seen",
        createdAt: { $lt: thirtyDaysAgo },
    });
    console.log("delete seen notification");
}));
