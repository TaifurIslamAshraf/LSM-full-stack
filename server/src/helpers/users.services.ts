import { Response } from "express";
import { redis } from "../config/redis";
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
