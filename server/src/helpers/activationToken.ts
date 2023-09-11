import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";

import config from "../config/config";
import { IActivationInfo } from "../types/user.controller";

export interface IActivationToken {
  token: string;
  activationCode: string;
}

export const createActivationToken = (
  user: IActivationInfo
): IActivationToken => {
  const activationCode = uuid();
  const token = jwt.sign(
    {
      user,
      activationCode,
    },
    config.activationToken,
    {
      expiresIn: "5m",
    }
  );

  return { token, activationCode };
};
