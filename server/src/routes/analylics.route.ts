import express from "express";
import {
  getCourseAnalytics,
  getOrderAnalytics,
  getUserAnalytics,
} from "../controllers/analytics.controller";
import { authorizedUser, isAuthenticated } from "../helpers/auth";

const analyticsRoute = express.Router();

analyticsRoute.get(
  "/user-analytics",
  isAuthenticated,
  authorizedUser("admin"),
  getUserAnalytics
);
analyticsRoute.get(
  "/course-analytics",
  isAuthenticated,
  authorizedUser("admin"),
  getCourseAnalytics
);
analyticsRoute.get(
  "/order-analytics",
  isAuthenticated,
  authorizedUser("admin"),
  getOrderAnalytics
);

export default analyticsRoute;
