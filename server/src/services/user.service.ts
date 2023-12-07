import ejs from "ejs";
import { Response } from "express";
import jwt from "jsonwebtoken";
import path from "path";
import config from "../config/config";
import { redis } from "../config/redis";
import sendMail from "../helpers/sendMail";
import ErrorHandler from "../utils/errorHandler";

//get user by id
export const getUserbyId = async (id: string, res: Response) => {
  const userJson = await redis.get(id);
  if (!userJson) {
    return new ErrorHandler("User not found", 404);
  }

  const user = JSON.parse(userJson);

  res.status(200).json({
    success: true,
    user,
  });
};

export const forgotPasswordService = async (userId: string, email: string) => {
  const serverUrl = config.serverUrl;

  const token = jwt.sign({ _id: userId }, config.jwtSecret, {
    expiresIn: "5m",
  });

  const forgotPasswordLink = `${serverUrl}/api/reset-password-link-validation/${userId}/${token}`;

  const html = await ejs.renderFile(
    path.join(__dirname + "../../../views/forgot-password.ejs"),
    { forgotPasswordLink }
  );

  await sendMail({
    email: email,
    subject: "Reset Your Skill sync Password",
    templete: "forgot-password.ejs",
    data: { forgotPasswordLink },
  });
};
