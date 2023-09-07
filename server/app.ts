import cookieParser from "cookie-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import config from "./src/config/config";
import connectDB from "./src/config/db";

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
app.use(cors({ origin: config.origin }));

//not found
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  res.status(404).sendFile(__dirname + "/views/error.html");
});
