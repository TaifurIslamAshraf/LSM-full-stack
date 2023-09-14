import dotenv from "dotenv";
import { Response } from "express";
import config from "../config/config";
import { redis } from "../config/redis";
import { ITokenOption } from "../types/jwt";
import { IUser } from "../types/user.model";

dotenv.config();

export const sendToken = (user: IUser, statusCode: number, res: Response) => {
  const accessToken = user.accessToken();
  const refreshToken = user.refreshToken();

  //upload session to redis
  redis.set(user._id, JSON.stringify(user) as any);

  //parse env var to intrigate with falback value
  const accessTokenExpire = parseInt(config.accessTokenExpire || "300", 10);
  const refreshTokenExpire = parseInt(config.refreshToeknExpire || "1200", 10);

  //options for cookies
  const accessTokenOption: ITokenOption = {
    expires: new Date(Date.now() + accessTokenExpire * 1000),
    maxAge: accessTokenExpire * 1000,
    httpOnly: true,
    sameSite: "lax",
  };

  const refreshToeknOption: ITokenOption = {
    expires: new Date(Date.now() + refreshTokenExpire * 1000),
    maxAge: refreshTokenExpire * 1000,
    httpOnly: true,
    sameSite: "lax",
  };

  //only set secure to true in production
  if (process.env.NODE_ENV === "production") {
    accessTokenOption.secure = true;
  }

  res.cookie("access_token", accessToken, accessTokenOption);
  res.cookie("refresh_token", refreshToken, refreshToeknOption);

  res.status(statusCode).json({
    success: true,
    user,
    accessToken,
  });
};
