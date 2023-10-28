import express from "express";
import {
  editCourse,
  getAllCourses,
  getSingleCourse,
  uploadCourse,
} from "../controllers/course.controller";
import { authorizedUser, isAuthenticated } from "../helpers/auth";

const courseRoute = express.Router();

courseRoute.post(
  "/create-course",
  isAuthenticated,
  authorizedUser("admin"),
  uploadCourse
);
courseRoute.patch(
  "/edit-course/:id",
  isAuthenticated,
  authorizedUser("admin"),
  editCourse
);
courseRoute.get("/get-course/:id", getSingleCourse);
courseRoute.get("/get-courses", getAllCourses);

export default courseRoute;
