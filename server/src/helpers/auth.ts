import jwt, { JwtPayload } from "jsonwebtoken";

import { NextFunction, Request, Response } from "express";
import { IUser } from "../../@types/user.model";
import config from "../config/config";
import { redis } from "../config/redis";
import { CatchAsyncError } from "../middlewares/catchAsyncErrors";
import ErrorHandler from "../utils/errorHandler";

export const isAuthenticated = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const access_token = req.cookies.access_token as string;

    if (!access_token) {
      return next(
        new ErrorHandler("Please login to access this resource", 400)
      );
    }

    const decoded = jwt.verify(
      access_token,
      config.accessTokenSecret
    ) as JwtPayload;

    if (!decoded) {
      return next(new ErrorHandler("Access token is not valid", 400));
    }

    const user = await redis.get(decoded._id);

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    (req as any).user = JSON.parse(user) as IUser;

    next();
  }
);
