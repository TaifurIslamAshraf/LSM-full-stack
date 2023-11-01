import ejs from "ejs";
import { NextFunction } from "express";

import path from "path";
import { ICourse } from "../../@types/course";
import { IUser } from "../../@types/user.model";
import sendMail from "../helpers/sendMail";
import ErrorHandler from "../utils/errorHandler";

export const orderService = async (
  course: ICourse,
  user: IUser,
  next: NextFunction
): Promise<void> => {
  try {
    const mailData = {
      _id: course._id.toString().slice(1, 7),
      user: user.name,
      name: course.name,
      price: course.price,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };

    const html = await ejs.renderFile(
      path.join(__dirname, "../../views/order-confirmation.ejs"),
      mailData
    );

    if (user) {
      await sendMail({
        email: user.email,
        subject: "Order confirmation from LMS",
        templete: "order-confirmation.ejs",
        data: mailData,
      });
    }
  } catch (error: any) {
    return next(new ErrorHandler(error, 500));
  }
};
