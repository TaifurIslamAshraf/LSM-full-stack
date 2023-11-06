import { NextFunction, Request, Response } from "express";
import { ICategory } from "../../@types/layout";
import { CatchAsyncError } from "../middlewares/catchAsyncErrors";
import CategoryModel from "../models/category.model";
import ErrorHandler from "../utils/errorHandler";

//create category
export const createCategory = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title } = req.body as ICategory;

      const category = await CategoryModel.create({
        title,
      });

      res.status(201).json({
        success: true,
        category: category,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//get category
export const getCategory = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = await CategoryModel.find();

      res.status(201).json({
        success: true,
        category: category,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//update category
export const updateCategory = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title } = req.body as ICategory;

      const category = await CategoryModel.findByIdAndUpdate(
        req.params.id,
        {
          title,
        },
        { new: true }
      );

      res.status(201).json({
        success: true,
        category: category,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//delete category
export const deleteCategory = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const category = await CategoryModel.findByIdAndDelete(id);

      res.status(201).json({
        success: true,
        category: category,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
