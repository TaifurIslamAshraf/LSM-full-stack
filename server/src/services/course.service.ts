import { Response } from "express";
import { CatchAsyncError } from "../middlewares/catchAsyncErrors";
import courseModel from "../models/course.model";

export const crateCourse = CatchAsyncError(async (data: any, res: Response) => {
  const course = await courseModel.create(data);
  res.status(201).json({
    success: true,
    message: "Course Create successfully",
    course,
  });
});
