import { NextFunction, Request, Response } from "express";
import { IFaqItem } from "../../@types/layout";
import { CatchAsyncError } from "../middlewares/catchAsyncErrors";
import FaqModel from "../models/faq.model";
import ErrorHandler from "../utils/errorHandler";

//create faq
export const createFaq = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { question, answer } = req.body as IFaqItem;

      const faq = await FaqModel.create({
        question,
        answer,
      });

      res.status(201).json({
        success: true,
        faq: faq,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//get faq
export const getFaq = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const faq = await FaqModel.find();

      res.status(201).json({
        success: true,
        faq: faq,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//update faq
export const updateFaq = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { question, answer } = req.body as IFaqItem;

      const faq = await FaqModel.findByIdAndUpdate(
        req.params.id,
        {
          question,
          answer,
        },
        { new: true }
      );

      res.status(201).json({
        success: true,
        faq: faq,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//delete faq
export const deleteFaq = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const faq = await FaqModel.findByIdAndDelete(id);

      res.status(201).json({
        success: true,
        faq: faq,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
