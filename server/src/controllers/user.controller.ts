import ejs from "ejs";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import path from "path";
import config from "../config/config";
import { createActivationToken } from "../helpers/activationToken";
import { sendToken } from "../helpers/jwt";
import sendMail from "../helpers/sendMail";
import { CatchAsyncError } from "../middlewares/catchAsyncErrors";
import userModel from "../models/user.model";
import {
  IActivationInfo,
  IActivationRequest,
  ILoginUser,
} from "../types/user.controller";
import ErrorHandler from "../utils/errorHandler";

export const registerUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //get data from body
      const { name, email, password, avatar } = req.body;

      //is Exist email
      const isExist = await userModel.exists({ email });
      if (isExist) {
        return next(new ErrorHandler("User alredy exist", 400));
      }

      //send activation email
      const activationInfo: IActivationInfo = {
        name,
        email,
        password,
        avatar,
      };
      const { token, activationCode } = createActivationToken(activationInfo);

      const data = {
        user: { name: activationInfo.name },
        activationCode: activationCode,
      };

      const html = await ejs.renderFile(
        path.join(__dirname, "../../views/email.ejs"),
        data
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

//activate user
export const activateUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { activation_token, activation_code }: IActivationRequest =
        req.body;

      if (!activation_code && !activation_token) {
        return next(new ErrorHandler("all field are required", 400));
      }

      //veryfy token and get user info
      const newUser: { user: IActivationInfo; activationCode: string } =
        jwt.verify(activation_token, config.activationSecret) as {
          user: IActivationInfo;
          activationCode: string;
        };

      if (newUser.activationCode !== activation_code) {
        return next(new ErrorHandler("Invalid activation code", 400));
      }

      //user data save in database
      const { name, email, password, avatar } = newUser.user;

      const existUser = await userModel.exists({ email });

      if (existUser) {
        return next(new ErrorHandler("User alredy exist", 400));
      }

      const user = await userModel.create({
        name,
        email,
        password,
        avatar,
      });

      res.status(201).json({
        success: true,
        message: "User registretion success",
        user,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//login user
export const loginUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body as ILoginUser;

      if (!email && !password) {
        return next(new ErrorHandler("All field are required", 400));
      }

      const user = await userModel.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("Invalid email or password", 400));
      }

      const isPasswordMatch = await user.comparePassword(password);

      if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid email or password", 400));
      }

      sendToken(user, 200, res);
    } catch (error: any) {
      return next(new ErrorHandler(`User -- ${error.message}`, 400));
    }
  }
);

//logout user
export const logoutUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.cookie("access_token", "", { maxAge: 1 });
      res.cookie("refresh_token", "", { maxAge: 1 });

      res.status(200).json({
        success: true,
        message: "Logout successfull",
      });
    } catch (error: any) {
      return next(new ErrorHandler(`User -- ${error.message}`, 400));
    }
  }
);
