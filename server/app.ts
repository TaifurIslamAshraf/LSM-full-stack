import cookieParser from "cookie-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import path from "path";
import config from "./src/config/config";
import connectDB from "./src/config/db";
import { ErrorMiddleware } from "./src/middlewares/error";
import successRes from "./src/utils/SuccessRes";

export const app = express();

//database connections
connectDB();

//set view engine to ejs
app.set("view engine", "ejs");
app.use(express.static(__dirname + "views"));

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cooki-parser
app.use(cookieParser());

//cors
app.use(cors({ origin: config.origin }));

//test route
app.get("/", (req: Request, res: Response) => {
  try {
    successRes(res, 200, {
      success: true,
      message: "Test successfully",
      data: "This is Data",
    });
  } catch (error) {}
});

//not found
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  res.status(404).sendFile(path.join(__dirname + "/views/error.html"));
});

//error handler
app.use(ErrorMiddleware);
