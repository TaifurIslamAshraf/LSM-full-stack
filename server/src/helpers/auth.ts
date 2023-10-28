import jwt, { JwtPayload } from "jsonwebtoken";

import { NextFunction, Request, Response } from "express";
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

    res.locals.user = JSON.parse(user);

    next();
  }
);

//user validatior
export const authorizedUser = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(res.locals.user?.role) || "") {
      return next(
        new ErrorHandler(
          `${res.locals.user?.role} is not allowed to access this resource`,
          403
        )
      );
    }

    next();
  };
};
