import express from "express";
import {
  addAnsware,
  addQustion,
  addReviewReplies,
  addReviews,
  deleteCourse,
  editCourse,
  getAllCourses,
  getAllProUserCourses,
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
courseRoute.get(
  "/get-pro-users-courses",
  isAuthenticated,
  authorizedUser("admin"),
  getAllProUserCourses
);
courseRoute.get("/get-user-course/:id", isAuthenticated, getCourseByUser);
courseRoute.patch("/add-qustion", isAuthenticated, addQustion);
courseRoute.patch("/add-answare", isAuthenticated, addAnsware);
courseRoute.put("/add-review/:id", isAuthenticated, addReviews);
courseRoute.put(
  "/add-replies-review",
  isAuthenticated,
  authorizedUser("admin"),
  addReviewReplies
);
courseRoute.delete(
  "/delete-course/:id",
  isAuthenticated,
  authorizedUser("admin"),
  deleteCourse
);

export default courseRoute;
