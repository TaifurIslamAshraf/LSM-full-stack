import { Response } from "express";

import { SuccessRes } from "../types/SuccessRes";

const successRes = (res: Response, statusCode: number, data: SuccessRes) => {
  res.status(statusCode).json(data);
};

export default successRes;
