"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notification_controller_1 = require("../controllers/notification.controller");
const auth_1 = require("../helpers/auth");
const notificationRoute = express_1.default.Router();
notificationRoute.get("/all-notifications", auth_1.isAuthenticated, (0, auth_1.authorizedUser)("admin"), notification_controller_1.getAllNotifications);
notificationRoute.patch("/update-notification/:id", auth_1.isAuthenticated, (0, auth_1.authorizedUser)("admin"), notification_controller_1.updateNotificaton);
exports.default = notificationRoute;
