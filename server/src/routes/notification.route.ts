import express from "express";
import {
  getAllNotifications,
  updateNotificaton,
} from "../controllers/notification.controller";
import { authorizedUser, isAuthenticated } from "../helpers/auth";

const notificationRoute = express.Router();

notificationRoute.get(
  "/all-notifications",
  isAuthenticated,
  authorizedUser("admin"),
  getAllNotifications
);
notificationRoute.patch(
  "/update-notification/:id",
  isAuthenticated,
  authorizedUser("admin"),
  updateNotificaton
);

export default notificationRoute;
