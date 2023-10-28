import jwt from "jsonwebtoken";

import { IActivationInfo } from "../../@types/user.controller";
import config from "../config/config";

export interface IActivationToken {
  token: string;
  activationCode: string;
}

export const createActivationToken = (
  user: IActivationInfo
): IActivationToken => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
  const token = jwt.sign(
    {
      user,
      activationCode,
    },
    config.activationSecret,
    {
      expiresIn: "5m",
    }
  );

  return { token, activationCode };
};
