import cloudinary from "cloudinary";
import { Response } from "express";
import { Types } from "mongoose";
import { CatchAsyncError } from "../middlewares/catchAsyncErrors";
import courseModel from "../models/course.model";
import ErrorHandler from "../utils/errorHandler";

export const crateCourse = CatchAsyncError(async (data: any, res: Response) => {
  const course = await courseModel.create(data);
  res.status(201).json({
    success: true,
    message: "Course Create successfully",
    course,
  });
});

export const updateCourseService = async (data: any, id: string) => {
  if (!Types.ObjectId.isValid(id)) {
    return new ErrorHandler("Invalid course id", 400);
  }

  const thumbnail = data.thumbnail;
  const course = await courseModel.findById(id);
  if (thumbnail && course?.thumbnail) {
    await cloudinary.v2.uploader.destroy(course?.thumbnail.public_id);

    const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
      folder: "course",
    });

    data.thumbnail = {
      public_id: myCloud.public_id,
      url: myCloud.url,
    };
  }

  const updatedCourse = await courseModel.findByIdAndUpdate(
    id,
    {
      $set: data,
    },
    { new: true }
  );

  return updatedCourse;
};
