import { Response } from "express";

import { errorHandler } from "../types/errorHandler";

const errorHandler = (res: Response, error: errorHandler) => {
  res.status(error.statusCode).json({
    success: false,
    message: error.message,
    error: error.error,
  });
};

export default errorHandler;
