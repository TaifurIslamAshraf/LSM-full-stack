import ejs from "ejs";
import { NextFunction, Request, Response } from "express";

import path from "path";
import config from "../config/config";
import { createActivationToken } from "../helpers/activationToken";
import sendMail from "../helpers/sendMail";
import { CatchAsyncError } from "../middlewares/catchAsyncErrors";
import userModel from "../models/user.model";
import { IActivationInfo } from "../types/user.controller";
import ErrorHandler from "../utils/errorHandler";

export const registerUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(config);

      //get data from body
      const { name, email, password, avater } = req.body;

      //is Exist email
      const isExist = await userModel.exists({ email });
      if (isExist) {
        return next(new ErrorHandler("User alredy exist", 400));
      }

      //send activation email
      const activationInfo: IActivationInfo = {
        name,
        email,
      };
      const { token, activationCode } = createActivationToken(activationInfo);

      const data = {
        user: { name: activationInfo.name },
        activationCode: activationCode,
      };

      const html = await ejs.renderFile(
        path.join(__dirname, "../../views/email.ejs"),
        { data }
      );

      try {
        await sendMail({
          email: activationInfo.email,
          subject: "Activate your account",
          templete: "email.ejs",
          data,
        });

        res.status(200).json({
          success: true,
          message: `Please check your email: ${activationInfo.email} to activate your account`,
          activationToken: token,
        });
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
