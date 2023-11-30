import cookieParser from "cookie-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import path from "path";

import connectDB from "./src/config/db";
import { ErrorMiddleware } from "./src/middlewares/error";
import successRes from "./src/utils/SuccessRes";

import analyticsRoute from "./src/routes/analylics.route";
import categoryRouter from "./src/routes/category.route";
import courseRoute from "./src/routes/course.route";
import faqRouter from "./src/routes/faq.route";
import layoutRoute from "./src/routes/layout.route";
import notificationRoute from "./src/routes/notification.route";
import orderRouter from "./src/routes/order.route";
import userRouter from "./src/routes/user.route";

export const app = express();

//database connections
connectDB();

//set view engine to ejs
app.set("view engine", "ejs");

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cooki-parser
app.use(cookieParser());

//cors
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));

//all routes
app.use("/api", userRouter);
app.use("/api", courseRoute);
app.use("/api", orderRouter);
app.use("/api", notificationRoute);
app.use("/api", analyticsRoute);
app.use("/api", layoutRoute);
app.use("/api", faqRouter);
app.use("/api", categoryRouter);

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
