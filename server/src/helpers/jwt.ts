import dotenv from "dotenv";
import { Response } from "express";
import { ITokenOption } from "../../@types/jwt";
import { IUser } from "../../@types/user.model";
import config from "../config/config";
import { redis } from "../config/redis";

dotenv.config();

//parse env var to intrigate with falback value
const accessTokenExpire = parseInt(config.accessTokenExpire || "300", 10);
const refreshTokenExpire = parseInt(config.refreshToeknExpire || "1200", 10);

//options for cookies
export const accessTokenOption: ITokenOption = {
  expires: new Date(Date.now() + accessTokenExpire * 60 * 1000),
  maxAge: accessTokenExpire * 60 * 1000,
  httpOnly: true,
  sameSite: "lax",
};

export const refreshToeknOption: ITokenOption = {
  expires: new Date(Date.now() + refreshTokenExpire * 24 * 60 * 60 * 1000),
  maxAge: refreshTokenExpire * 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: "lax",
};

export const sendToken = (user: IUser, statusCode: number, res: Response) => {
  const accessToken = user.accessToken();
  const refreshToken = user.refreshToken();

  //upload session to redis
  redis.set(user._id, JSON.stringify(user) as any);

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
