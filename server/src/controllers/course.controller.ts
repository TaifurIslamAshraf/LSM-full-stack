import cloudinary from "cloudinary";
import ejs from "ejs";
import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";

import path from "path";
import { IAddAsnwareBody, IQustionBody } from "../../@types/course";
import { redis } from "../config/redis";
import sendMail from "../helpers/sendMail";
import { CatchAsyncError } from "../middlewares/catchAsyncErrors";
import courseModel from "../models/course.model";
import userModel from "../models/user.model";
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

//get course content only for valid user
export const getCourseByUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userCourseList = res.locals.user?.course;
      const courseId = req.params.id;

      if (
        !Types.ObjectId.isValid(userCourseList) &&
        !Types.ObjectId.isValid(courseId)
      ) {
        return next(new ErrorHandler("invalid course", 400));
      }

      const courseExist = userCourseList?.find(
        (course: any) => course._id.toString() === courseId
      );

      if (!courseExist) {
        return next(
          new ErrorHandler("You are not eligible to access this course", 404)
        );
      }

      const course = await courseModel.aggregate([
        {
          $match: {
            _id: new Types.ObjectId(courseId),
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
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//add qustions
export const addQustion = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { qustion, courseId, contentId }: IQustionBody = req.body;

      if (!Types.ObjectId.isValid(contentId)) {
        return next(new ErrorHandler("Invalid course id", 400));
      }

      const course = await courseModel.findById(courseId);
      if (!course) {
        return next(new ErrorHandler("course not found", 404));
      }
      const courseContent = course?.courseData.find(
        (item: any) => item._id.toString() === contentId
      );

      if (!courseContent) {
        return next(new ErrorHandler("course content not found", 404));
      }

      const newQustion: any = {
        user: res.locals.user._id,
        qustion,
        qustionReplies: [],
      };

      //add qustion in course
      courseContent.qustions.push(newQustion);

      await course.save();

      res.status(200).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//add answare in course qustion
export const addAnsware = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { contentId, courseId, answare, qustionId }: IAddAsnwareBody =
        req.body;
      if (!Types.ObjectId.isValid(courseId)) {
        return next(new ErrorHandler("Invalid course", 400));
      }

      const ansObj = {
        user: res.locals.user._id,
        answare,
      };

      const updatedAnsware = await courseModel.findByIdAndUpdate(
        courseId,
        {
          $push: {
            "courseData.$[data].qustions.$[qustion].qustionReplies": ansObj,
          },
        },
        {
          arrayFilters: [
            { "data._id": contentId },
            { "qustion._id": qustionId },
          ],
          new: true,
        }
      );

      if (!updatedAnsware) {
        return next(new ErrorHandler("Course not found", 404));
      }

      const courseContent = updatedAnsware.courseData.find(
        (item: any) => item._id.toString() === contentId
      );
      const qustion = courseContent?.qustions.find(
        (item: any) => item._id.toString() === qustionId
      );

      const qustionUser = await userModel.findById(qustion.user.toString());

      if (!qustionUser) {
        return next(new ErrorHandler("User not found", 404));
      }

      if (res.locals.user._id === qustion.user.toString()) {
        // create a notification
      } else {
        const data = {
          name: qustionUser?.name,
          title: courseContent.title,
        };

        const html = await ejs.renderFile(
          path.join(__dirname, "../../views/qustion-replies.ejs"),
          data
        );

        try {
          await sendMail({
            email: qustionUser.email,
            subject: "Qustion Replies form LMS",
            templete: "qustion-replies.ejs",
            data,
          });
        } catch (error: any) {
          return next(new ErrorHandler(error.message, 500));
        }
      }

      res.status(200).json({
        success: true,
        message: "Answer added successfully",
        course: updatedAnsware,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// add review in course
export const addReviews = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { review, rating } = req.body;
      const courseId = req.params.id;
      const userCourseList = res.locals.user?.course;

      const courseExist = userCourseList.some(
        (item: any) => item._id.toString() === courseId
      );

      if (!courseExist) {
        return next(
          new ErrorHandler("You are not eligble in this course", 400)
        );
      }

      const course = await courseModel.findById(courseId);
      if (!course) {
        return next(new ErrorHandler("Course not found", 404));
      }

      const reviewData: any = {
        user: res.locals.user._id,
        rating,
        comment: review,
      };

      course?.reviews.push(reviewData);

      let avg = 0;

      course?.reviews.forEach((rev: any) => {
        avg += rev.rating;
      });

      course.rating = avg / course.reviews.length;

      await course.save();

      const notification = {
        title: "New Review added",
        message: `${res.locals.user.name} has given a review in yours course ${course.name}`,
      };

      //send a notifications

      res.status(200).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//add replies in review
export const addReviewReplies = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, reviewId, reviewReplies } = req.body;

      const course = await courseModel.findById(courseId);
      if (!course) {
        return next(new ErrorHandler("Course not found", 404));
      }

      const review = course.reviews.find(
        (rev: any) => rev._id.toString() === reviewId
      );
      if (!review) {
        return next(new ErrorHandler("Course review not found", 404));
      }

      const replieReviewData = {
        user: res.locals.user._id,
        reviewReplies,
      };

      if (!review.commentReplies) {
        review.commentReplies = [{}];
      }

      review.commentReplies?.push(replieReviewData);
      await course.save();

      res.status(201).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//
