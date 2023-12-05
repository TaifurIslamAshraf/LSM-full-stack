import cloudinary from "cloudinary";
import ejs from "ejs";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import path from "path";
import {
  IActivationInfo,
  IActivationRequest,
  ILoginUser,
  ISocialAuthBody,
  IUpdatePassword,
  IUpdateProfile,
  IUpdateUserInfo,
} from "../../@types/user.controller";
import config from "../config/config";
import { redis } from "../config/redis";
import { createActivationToken } from "../helpers/activationToken";
import {
  accessTokenOption,
  refreshToeknOption,
  sendToken,
} from "../helpers/jwt";
import sendMail from "../helpers/sendMail";
import { CatchAsyncError } from "../middlewares/catchAsyncErrors";
import userModel from "../models/user.model";
import { getUserbyId } from "../services/user.service";
import ErrorHandler from "../utils/errorHandler";

export const registerUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //get data from body
      const { name, email, password, avatar } = req.body as IActivationInfo;

      //is Exist email
      const user = await userModel.findOne({ email });

      if (user?.isSocialAuth) {
        return next(
          new ErrorHandler("You are alredy sign in with google or github", 400)
        );
      }

      if (user) {
        return next(new ErrorHandler("User alredy exist", 400));
      }

      //send activation email
      const activationInfo = {
        name: name,
        email: email,
        password: password,
        avatar: avatar,
        isSocialAuth: false,
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
      const { name, email, password, avatar, isSocialAuth } = newUser.user;

      const existUser = await userModel.exists({ email });

      if (existUser) {
        return next(new ErrorHandler("User alredy exist", 400));
      }

      const user = await userModel.create({
        name,
        email,
        password,
        avatar,
        isSocialAuth,
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

      if (user?.isSocialAuth) {
        return next(
          new ErrorHandler("You are sign in with google or github", 400)
        );
      }

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
      res.clearCookie("refresh_token");
      res.clearCookie("access_token");

      const userId = res.locals.user?._id || "";

      redis.del(userId);
      res.status(200).json({
        success: true,
        message: "Logout successfull",
      });
    } catch (error: any) {
      return next(new ErrorHandler(`User -- ${error.message}`, 400));
    }
  }
);

//update access token
export const updateAccessToken = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refresh_token = req.cookies.refresh_token as string;
      const decoded = jwt.verify(
        refresh_token,
        config.refreshTokenSecret
      ) as JwtPayload;

      if (!decoded) {
        return next(
          new ErrorHandler("Please login to access this recourse", 400)
        );
      }

      const session = await redis.get(decoded._id);

      if (!session) {
        return next(
          new ErrorHandler("Please login to access this recourse", 400)
        );
      }

      const user = JSON.parse(session);

      const accessToken = jwt.sign(
        { _id: user._id },
        config.accessTokenSecret,
        {
          expiresIn: "5m",
        }
      );

      const refreshToken = jwt.sign(
        { _id: user._id },
        config.refreshTokenSecret,
        { expiresIn: "3d" }
      );

      res.locals.user = user;

      res.cookie("access_token", accessToken, accessTokenOption);
      res.cookie("refresh_token", refreshToken, refreshToeknOption);

      await redis.set(user._id, JSON.stringify(user), "EX", 604800); //7 days

      res.status(200).json({
        success: true,
        accessToken,
      });
    } catch (error: any) {
      return next(new ErrorHandler(`User -- ${error.message}`, 400));
    }
  }
);

//get user info
export const getUserInfo = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = res.locals.user?._id;

      getUserbyId(userId, res);
    } catch (error: any) {
      return next(new ErrorHandler(`User -- ${error.message}`, 400));
    }
  }
);

//social auth
export const socialAuth = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, avatar } = req.body as ISocialAuthBody;
      if (!name || !email || !avatar) {
        return next(new ErrorHandler("All field are required", 400));
      }
      const user = await userModel.findOne({ email });

      if (!user) {
        const newUser = await userModel.create({
          name,
          email,
          avatar,
          isSocialAuth: true,
        });
        sendToken(newUser, 201, res);
      } else {
        sendToken(user, 200, res);
      }
    } catch (error: any) {
      return next(new ErrorHandler(`social auth -- ${error.message}`, 400));
    }
  }
);

//update user info
export const updateUserInfo = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email } = req.body as IUpdateUserInfo;
      const userId = res.locals.user?._id;
      const user = await userModel.findById(userId);

      if (!user) {
        return next(new ErrorHandler("User is not found", 404));
      }

      const emailExist = await userModel.findOne({ email });
      if (emailExist) {
        return next(new ErrorHandler("Email alredy exist", 400));
      }

      if (name && user) {
        user.name = name;
      }
      if (email && user) {
        user.email = email;
      }

      await user?.save();

      await redis.set(userId, JSON.stringify(user));

      res.status(201).json({
        success: true,
        message: "User info update successfully",
        user,
      });
    } catch (error: any) {
      return next(new ErrorHandler(`update user -- ${error.message}`, 400));
    }
  }
);

//update password
export const updatePassword = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { oldPassword, newPassword } = req.body as IUpdatePassword;

      if (!oldPassword || !newPassword) {
        return next(new ErrorHandler("All field are required", 400));
      }

      const user = await userModel
        .findById(res.locals.user?._id)
        .select("+password");

      if (user?.password === undefined) {
        return next(
          new ErrorHandler("you are not to able update password", 400)
        );
      }

      const isPasswordMatch = await user.comparePassword(oldPassword);
      console.log(isPasswordMatch);

      if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid old Password", 400));
      }

      user.password = newPassword;

      await user.save();
      await redis.set(res.locals.user?._id, JSON.stringify(user));

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error: any) {
      return next(new ErrorHandler(`update password -- ${error.message}`, 400));
    }
  }
);

//update profile picture
export const updateAvatar = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { avatar } = req.body as IUpdateProfile;
      if (!avatar) {
        return next(new ErrorHandler("avatar is required", 400));
      }

      const userId = res.locals.user?._id;
      const user = await userModel.findById(userId);

      if (!user) {
        return next(new ErrorHandler("User is not found", 404));
      }

      if (user.isSocialAuth) {
        return next(
          new ErrorHandler("You are not able to update profile picture", 400)
        );
      }

      //frist delete old one
      if (user?.avatar?.public_id) {
        await cloudinary.v2.uploader.destroy(user?.avatar?.public_id);
      }

      const newProfile = await cloudinary.v2.uploader.upload(avatar, {
        folder: "avatar",
        width: 150,
      });

      user.avatar = {
        public_id: newProfile.public_id,
        url: newProfile.url,
      };

      await user.save();
      await redis.set(userId, JSON.stringify(user));

      res.status(200).json({
        success: true,
        message: "Profile update successfully",
        user,
      });
    } catch (error: any) {
      return next(new ErrorHandler(`update profile -- ${error.message}`, 400));
    }
  }
);

//get all users -- admin
export const getAllUsers = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await userModel.find().sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        users,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//update user role -- admin
export const updateUserRole = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, role } = req.body;
      const user = await userModel.findByIdAndUpdate(
        id,
        { role },
        { new: true }
      );
      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//delete user
export const deleteUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const user = await userModel.findById(id);
      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }

      if (id === res.locals.user._id.toString()) {
        return next(
          new ErrorHandler("You are not able to delete your self", 400)
        );
      }

      await user.deleteOne({ id });
      await redis.del(id);

      res.status(200).json({
        success: true,
        message: "user deleted successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
