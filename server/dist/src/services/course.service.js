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
exports.updateCourseService = exports.crateCourse = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const mongoose_1 = require("mongoose");
const catchAsyncErrors_1 = require("../middlewares/catchAsyncErrors");
const course_model_1 = __importDefault(require("../models/course.model"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
exports.crateCourse = (0, catchAsyncErrors_1.CatchAsyncError)((data, res) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield course_model_1.default.create(data);
    res.status(201).json({
        success: true,
        message: "Course Create successfully",
        course,
    });
}));
const updateCourseService = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        return new errorHandler_1.default("Invalid course id", 400);
    }
    const thumbnail = data.thumbnail;
    const course = yield course_model_1.default.findById(id);
    if (thumbnail && (course === null || course === void 0 ? void 0 : course.thumbnail)) {
        yield cloudinary_1.default.v2.uploader.destroy(course === null || course === void 0 ? void 0 : course.thumbnail.public_id);
        const myCloud = yield cloudinary_1.default.v2.uploader.upload(thumbnail, {
            folder: "course",
        });
        data.thumbnail = {
            public_id: myCloud.public_id,
            url: myCloud.url,
        };
    }
    const updatedCourse = yield course_model_1.default.findByIdAndUpdate(id, {
        $set: data,
    }, { new: true });
    return updatedCourse;
});
exports.updateCourseService = updateCourseService;
