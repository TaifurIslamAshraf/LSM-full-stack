"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const analytics_controller_1 = require("../controllers/analytics.controller");
const auth_1 = require("../helpers/auth");
const analyticsRoute = express_1.default.Router();
analyticsRoute.get("/user-analytics", auth_1.isAuthenticated, (0, auth_1.authorizedUser)("admin"), analytics_controller_1.getUserAnalytics);
analyticsRoute.get("/course-analytics", auth_1.isAuthenticated, (0, auth_1.authorizedUser)("admin"), analytics_controller_1.getCourseAnalytics);
analyticsRoute.get("/order-analytics", auth_1.isAuthenticated, (0, auth_1.authorizedUser)("admin"), analytics_controller_1.getOrderAnalytics);
exports.default = analyticsRoute;
