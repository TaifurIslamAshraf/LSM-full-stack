import ejs from "ejs";
import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";

import path from "path";
import { createActivationToken } from "../helpers/activationToken";
import userModel from "../models/user.model";
import { IActivationInfo } from "../types/user.controller";
import ErrorHandler from "../utils/errorHandler";

export const registerUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
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
      user: activationInfo.name,
      activationCode,
    };

    const html = await ejs.renderFile(
      path.join(__dirname, "../../views/email.ejs"),
      data
    );
  }
);
