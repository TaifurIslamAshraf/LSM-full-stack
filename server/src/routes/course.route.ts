import express from "express";
import {
  addAnsware,
  addQustion,
  editCourse,
  getAllCourses,
  getCourseByUser,
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
courseRoute.get("/get-user-course/:id", isAuthenticated, getCourseByUser);
courseRoute.patch("/add-qustion", isAuthenticated, addQustion);
courseRoute.patch(
  "/add-answare",
  isAuthenticated,
  authorizedUser("admin"),
  addAnsware
);

export default courseRoute;