import express from "express";
import { uploadCourse } from "../controllers/course.controller";
import { authorizedUser, isAuthenticated } from "../helpers/auth";

const courseRoute = express.Router();

courseRoute.post(
  "/create-course",
  isAuthenticated,
  authorizedUser("admin"),
  uploadCourse
);

export default courseRoute;
