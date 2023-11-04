import { NextFunction, Request, Response } from "express";
import { generateAnalytics } from "../helpers/analytics.generator";
import { CatchAsyncError } from "../middlewares/catchAsyncErrors";
import courseModel from "../models/course.model";
import { OrderModel } from "../models/order.model";
import userModel from "../models/user.model";
import ErrorHandler from "../utils/errorHandler";

//get users analytics
export const getUserAnalytics = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await generateAnalytics(userModel);

      res.status(200).json({
        success: true,
        userAnalytics: user,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//get courses analytics
export const getCourseAnalytics = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const course = await generateAnalytics(courseModel);

      res.status(200).json({
        success: true,
        courseAnalytics: course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//get courses analytics
export const getOrderAnalytics = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const order = await generateAnalytics(OrderModel);

      res.status(200).json({
        success: true,
        orderAnalytics: order,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
