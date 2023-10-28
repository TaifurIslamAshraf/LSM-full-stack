import cloudinary from "cloudinary";
import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { redis } from "../config/redis";
import { CatchAsyncError } from "../middlewares/catchAsyncErrors";
import courseModel from "../models/course.model";
import { crateCourse, updateCourseService } from "../services/course.service";
import ErrorHandler from "../utils/errorHandler";

//upload course
export const uploadCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      const thumbnail = data.thumbnail;

      if (thumbnail) {
        const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
          folder: "courses",
        });

        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      crateCourse(data, res, next);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//edit course
export const editCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const courseId = req.params.id as string;

      const course = await updateCourseService(data, courseId);

      res.status(200).json({
        success: true,
        message: "Course updated successfully",
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const getSingleCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      if (!Types.ObjectId.isValid(id)) {
        return next(new ErrorHandler("Course is not found", 400));
      }

      const isCacheExist = await redis.get(id);

      if (isCacheExist) {
        const course = JSON.parse(isCacheExist);
        res.status(200).json({
          success: true,
          course,
        });
      } else {
        const course = await courseModel.aggregate([
          {
            $match: {
              _id: new Types.ObjectId(id),
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
          return next(new ErrorHandler("Course is not found", 400));
        }

        await redis.set(id, JSON.stringify(course));

        res.status(200).json({
          success: true,
          course,
        });
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const getAllCourses = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const isCacheExist = await redis.get("courses");
      if (isCacheExist) {
        res.status(200).json({
          success: true,
          courses: JSON.parse(isCacheExist),
        });
      } else {
        const courses = await courseModel
          .find()
          .select(
            "-courseData.videoUrl -courseData.suggestion -courseData.qustions -courseData.links"
          );

        if (!courses) {
          return next(new ErrorHandler("Course is not found", 400));
        }

        await redis.set("courses", JSON.stringify(courses));

        res.status(200).json({
          success: true,
          courses,
        });
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
