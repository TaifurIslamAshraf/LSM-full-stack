import express from "express";
import {
  createBanner,
  deleteBanner,
  getBanner,
  updateBanner,
} from "../controllers/layout.controller";
import { authorizedUser, isAuthenticated } from "../helpers/auth";

const layoutRoute = express.Router();

layoutRoute.post(
  "/create-banner",
  isAuthenticated,
  authorizedUser("admin"),
  createBanner
);

layoutRoute.get(
  "/get-banner",
  isAuthenticated,
  authorizedUser("admin"),
  getBanner
);
layoutRoute.put(
  "/update-banner/:id",
  isAuthenticated,
  authorizedUser("admin"),
  updateBanner
);
layoutRoute.delete(
  "/delete-banner/:id",
  isAuthenticated,
  authorizedUser("admin"),
  deleteBanner
);

export default layoutRoute;
