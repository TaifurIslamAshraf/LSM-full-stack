import express from "express";
import { createLayout } from "../controllers/layout.controller";
import { authorizedUser, isAuthenticated } from "../helpers/auth";

const layoutRoute = express.Router();

layoutRoute.post(
  "/create-layout",
  isAuthenticated,
  authorizedUser("admin"),
  createLayout
);

export default layoutRoute;
