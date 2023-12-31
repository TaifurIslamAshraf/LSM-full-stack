"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const course_controller_1 = require("../controllers/course.controller");
const auth_1 = require("../helpers/auth");
const courseRoute = express_1.default.Router();
courseRoute.post("/create-course", auth_1.isAuthenticated, (0, auth_1.authorizedUser)("admin"), course_controller_1.uploadCourse);
courseRoute.patch("/edit-course/:id", auth_1.isAuthenticated, (0, auth_1.authorizedUser)("admin"), course_controller_1.editCourse);
courseRoute.get("/get-course/:id", course_controller_1.getSingleCourse);
courseRoute.get("/get-courses", course_controller_1.getAllCourses);
courseRoute.get("/get-pro-users-courses", auth_1.isAuthenticated, (0, auth_1.authorizedUser)("admin"), course_controller_1.getAllProUserCourses);
courseRoute.get("/get-user-course/:id", auth_1.isAuthenticated, course_controller_1.getCourseByUser);
courseRoute.patch("/add-qustion", auth_1.isAuthenticated, course_controller_1.addQustion);
courseRoute.patch("/add-answare", auth_1.isAuthenticated, course_controller_1.addAnsware);
courseRoute.put("/add-review/:id", auth_1.isAuthenticated, course_controller_1.addReviews);
courseRoute.put("/add-replies-review", auth_1.isAuthenticated, (0, auth_1.authorizedUser)("admin"), course_controller_1.addReviewReplies);
courseRoute.delete("/delete-course/:id", auth_1.isAuthenticated, (0, auth_1.authorizedUser)("admin"), course_controller_1.deleteCourse);
exports.default = courseRoute;
