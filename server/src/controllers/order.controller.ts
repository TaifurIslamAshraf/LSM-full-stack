import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { CatchAsyncError } from "../middlewares/catchAsyncErrors";
import courseModel from "../models/course.model";
import { NotificationModel } from "../models/notification.model";
import { OrderModel } from "../models/order.model";
import userModel from "../models/user.model";
import { orderService } from "../services/order.service";
import ErrorHandler from "../utils/errorHandler";

export const createOrder = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, payment_info } = req.body;
      const userId = res.locals.user?._id;

      if (!Types.ObjectId.isValid(courseId)) {
        return next(new ErrorHandler("Invalid course id", 400));
      }

      const user = await userModel.findById(userId);
      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }

      const courseExistInUser = user.course.some(
        (item: any) => item._id.toString() === courseId
      );
      if (courseExistInUser) {
        return next(
          new ErrorHandler("You have alredy purchased this course", 400)
        );
      }

      const course = await courseModel.findById(courseId);
      if (!course) {
        return next(new ErrorHandler("Course not found", 404));
      }

      const data = {
        courseId: course._id,
        userId: userId,
        payment_info,
      };

      const order = await OrderModel.create(data);

      //send mail
      await orderService(course, user, next);

      user.course.push(course._id);
      course.purchased = (course.purchased ?? 0) + 1;

      await NotificationModel.create({
        userId: userId,
        title: "New Order",
        message: `Your order has been placed for ${course.name}`,
      });

      await user.save();
      await course.save();

      res.status(201).json({
        success: true,
        order,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//get all orders -- admin
export const getAllOrders = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orders = await OrderModel.find().sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
