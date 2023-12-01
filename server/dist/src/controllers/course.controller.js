"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCourse = exports.getAllProUserCourses = exports.addReviewReplies = exports.addReviews = exports.addAnsware = exports.addQustion = exports.getCourseByUser = exports.getAllCourses = exports.getSingleCourse = exports.editCourse = exports.uploadCourse = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const ejs_1 = __importDefault(require("ejs"));
const mongoose_1 = require("mongoose");
const path_1 = __importDefault(require("path"));
const redis_1 = require("../config/redis");
const sendMail_1 = __importDefault(require("../helpers/sendMail"));
const catchAsyncErrors_1 = require("../middlewares/catchAsyncErrors");
const course_model_1 = __importDefault(require("../models/course.model"));
const notification_model_1 = require("../models/notification.model");
const user_model_1 = __importDefault(require("../models/user.model"));
const course_service_1 = require("../services/course.service");
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
//upload course
exports.uploadCourse = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const thumbnail = data.thumbnail;
        if (thumbnail) {
            const myCloud = yield cloudinary_1.default.v2.uploader.upload(thumbnail, {
                folder: "courses",
            });
            data.thumbnail = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            };
        }
        (0, course_service_1.crateCourse)(data, res, next);
    }
    catch (error) {
        return next(new errorHandler_1.default(error.message, 500));
    }
}));
//edit course
exports.editCourse = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const courseId = req.params.id;
        const course = yield (0, course_service_1.updateCourseService)(data, courseId);
        res.status(200).json({
            success: true,
            message: "Course updated successfully",
            course,
        });
    }
    catch (error) {
        return next(new errorHandler_1.default(error.message, 500));
    }
}));
exports.getSingleCourse = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            return next(new errorHandler_1.default("Course is not found", 400));
        }
        const isCacheExist = yield redis_1.redis.get(id);
        if (isCacheExist) {
            const course = JSON.parse(isCacheExist);
            res.status(200).json({
                success: true,
                course,
            });
        }
        else {
            const course = yield course_model_1.default.aggregate([
                {
                    $match: {
                        _id: new mongoose_1.Types.ObjectId(id),
                    },
                },
                {
                    $project: {
                        "courseData.videoUrl": 0,
                        "courseData.suggestion": 0,
                        "courseData.qustions": 0,
                        "courseData.links": 0,
                    },
                },
            ]);
            if (!course) {
                return next(new errorHandler_1.default("Course is not found", 400));
            }
            yield redis_1.redis.set(id, JSON.stringify(course), "EX", 604800);
            res.status(200).json({
                success: true,
                course,
            });
        }
    }
    catch (error) {
        return next(new errorHandler_1.default(error.message, 500));
    }
}));
exports.getAllCourses = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isCacheExist = yield redis_1.redis.get("courses");
        if (isCacheExist) {
            res.status(200).json({
                success: true,
                courses: JSON.parse(isCacheExist),
            });
        }
        else {
            const courses = yield course_model_1.default
                .find()
                .select("-courseData.videoUrl -courseData.suggestion -courseData.qustions -courseData.links");
            if (!courses) {
                return next(new errorHandler_1.default("Course is not found", 400));
            }
            yield redis_1.redis.set("courses", JSON.stringify(courses));
            res.status(200).json({
                success: true,
                courses,
            });
        }
    }
    catch (error) {
        return next(new errorHandler_1.default(error.message, 500));
    }
}));
//get course content only for valid user
exports.getCourseByUser = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userCourseList = (_a = res.locals.user) === null || _a === void 0 ? void 0 : _a.course;
        const courseId = req.params.id;
        if (!mongoose_1.Types.ObjectId.isValid(userCourseList) &&
            !mongoose_1.Types.ObjectId.isValid(courseId)) {
            return next(new errorHandler_1.default("invalid course", 400));
        }
        const courseExist = userCourseList === null || userCourseList === void 0 ? void 0 : userCourseList.find((course) => course._id.toString() === courseId);
        if (!courseExist) {
            return next(new errorHandler_1.default("You are not eligible to access this course", 404));
        }
        const course = yield course_model_1.default.aggregate([
            {
                $match: {
                    _id: new mongoose_1.Types.ObjectId(courseId),
                },
            },
            {
                $project: {
                    courseData: 1,
                },
            },
        ]);
        res.status(200).json({
            success: true,
            course,
        });
    }
    catch (error) {
        return next(new errorHandler_1.default(error.message, 500));
    }
}));
//add qustions
exports.addQustion = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { qustion, courseId, contentId } = req.body;
        if (!mongoose_1.Types.ObjectId.isValid(contentId)) {
            return next(new errorHandler_1.default("Invalid course id", 400));
        }
        const course = yield course_model_1.default.findById(courseId);
        if (!course) {
            return next(new errorHandler_1.default("course not found", 404));
        }
        const courseContent = course === null || course === void 0 ? void 0 : course.courseData.find((item) => item._id.toString() === contentId);
        if (!courseContent) {
            return next(new errorHandler_1.default("course content not found", 404));
        }
        const newQustion = {
            user: res.locals.user._id,
            qustion,
            qustionReplies: [],
        };
        //add qustion in course
        courseContent.qustions.push(newQustion);
        //create notifications
        yield notification_model_1.NotificationModel.create({
            userId: res.locals.user._id,
            title: "New qustion",
            message: `Your have a new qustion for this ${course.name} on ${courseContent.title} lecture`,
        });
        yield course.save();
        res.status(200).json({
            success: true,
            course,
        });
    }
    catch (error) {
        return next(new errorHandler_1.default(error.message, 500));
    }
}));
//add answare in course qustion
exports.addAnsware = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { contentId, courseId, answare, qustionId } = req.body;
        if (!mongoose_1.Types.ObjectId.isValid(courseId)) {
            return next(new errorHandler_1.default("Invalid course", 400));
        }
        const ansObj = {
            user: res.locals.user._id,
            answare,
        };
        const updatedAnsware = yield course_model_1.default.findByIdAndUpdate(courseId, {
            $push: {
                "courseData.$[data].qustions.$[qustion].qustionReplies": ansObj,
            },
        }, {
            arrayFilters: [
                { "data._id": contentId },
                { "qustion._id": qustionId },
            ],
            new: true,
        });
        if (!updatedAnsware) {
            return next(new errorHandler_1.default("Course not found", 404));
        }
        const courseContent = updatedAnsware.courseData.find((item) => item._id.toString() === contentId);
        const qustion = courseContent === null || courseContent === void 0 ? void 0 : courseContent.qustions.find((item) => item._id.toString() === qustionId);
        const qustionUser = yield user_model_1.default.findById(qustion.user.toString());
        if (!qustionUser) {
            return next(new errorHandler_1.default("User not found", 404));
        }
        if (res.locals.user._id === qustion.user.toString()) {
            //create notifications
            yield notification_model_1.NotificationModel.create({
                userId: res.locals.user._id,
                title: "New qustion",
                message: `Your have a new qustion for this ${updatedAnsware.name} on ${courseContent.title} lecture`,
            });
        }
        else {
            const data = {
                name: qustionUser === null || qustionUser === void 0 ? void 0 : qustionUser.name,
                title: courseContent.title,
            };
            const html = yield ejs_1.default.renderFile(path_1.default.join(__dirname, "../../views/qustion-replies.ejs"), data);
            try {
                yield (0, sendMail_1.default)({
                    email: qustionUser.email,
                    subject: "Qustion Replies form LMS",
                    templete: "qustion-replies.ejs",
                    data,
                });
            }
            catch (error) {
                return next(new errorHandler_1.default(error.message, 500));
            }
        }
        res.status(200).json({
            success: true,
            message: "Answer added successfully",
            course: updatedAnsware,
        });
    }
    catch (error) {
        return next(new errorHandler_1.default(error.message, 500));
    }
}));
// add review in course
exports.addReviews = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const { review, rating } = req.body;
        const courseId = req.params.id;
        const userCourseList = (_b = res.locals.user) === null || _b === void 0 ? void 0 : _b.course;
        const courseExist = userCourseList.some((item) => item._id.toString() === courseId);
        if (!courseExist) {
            return next(new errorHandler_1.default("You are not eligble in this course", 400));
        }
        const course = yield course_model_1.default.findById(courseId);
        if (!course) {
            return next(new errorHandler_1.default("Course not found", 404));
        }
        const reviewData = {
            user: res.locals.user._id,
            rating,
            comment: review,
        };
        course === null || course === void 0 ? void 0 : course.reviews.push(reviewData);
        let avg = 0;
        course === null || course === void 0 ? void 0 : course.reviews.forEach((rev) => {
            avg += rev.rating;
        });
        course.rating = avg / course.reviews.length;
        yield course.save();
        const notification = {
            title: "New Review added",
            message: `${res.locals.user.name} has given a review in yours course ${course.name}`,
        };
        //send a notifications
        res.status(200).json({
            success: true,
            course,
        });
    }
    catch (error) {
        return next(new errorHandler_1.default(error.message, 500));
    }
}));
//add replies in review
exports.addReviewReplies = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const { courseId, reviewId, reviewReplies } = req.body;
        const course = yield course_model_1.default.findById(courseId);
        if (!course) {
            return next(new errorHandler_1.default("Course not found", 404));
        }
        const review = course.reviews.find((rev) => rev._id.toString() === reviewId);
        if (!review) {
            return next(new errorHandler_1.default("Course review not found", 404));
        }
        const replieReviewData = {
            user: res.locals.user._id,
            reviewReplies,
        };
        if (!review.commentReplies) {
            review.commentReplies = [{}];
        }
        (_c = review.commentReplies) === null || _c === void 0 ? void 0 : _c.push(replieReviewData);
        yield course.save();
        res.status(201).json({
            success: true,
            course,
        });
    }
    catch (error) {
        return next(new errorHandler_1.default(error.message, 500));
    }
}));
//get all courses -- admin
exports.getAllProUserCourses = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield course_model_1.default.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            courses,
        });
    }
    catch (error) {
        return next(new errorHandler_1.default(error.message, 500));
    }
}));
//delete course
exports.deleteCourse = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const course = yield course_model_1.default.findByIdAndDelete(id);
        if (!course) {
            return next(new errorHandler_1.default("Course not found", 404));
        }
        yield redis_1.redis.del(id);
        res.status(200).json({
            success: true,
            message: "course deleted successfully",
        });
    }
    catch (error) {
        return next(new errorHandler_1.default(error.message, 500));
    }
}));
