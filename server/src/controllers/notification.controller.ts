import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middlewares/catchAsyncErrors";
import { NotificationModel } from "../models/notification.model";
import ErrorHandler from "../utils/errorHandler";

//get all notification -- user should be a admin
export const getAllNotifications = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const AllNotifications = await NotificationModel.find().sort({
        createdAt: -1,
      });

      if (!AllNotifications) {
        return next(new ErrorHandler("Notification not found", 404));
      }

      res.status(200).json({
        success: true,
        AllNotifications,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//update notification -- admin
export const updateNotificaton = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const UpdatedNotification = await NotificationModel.findByIdAndUpdate(
        id,
        {
          status: "seen",
        },
        { new: true }
      );

      if (!UpdatedNotification) {
        return next(new ErrorHandler("Notification not found", 404));
      }

      const notification = await NotificationModel.find().sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        notification,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
