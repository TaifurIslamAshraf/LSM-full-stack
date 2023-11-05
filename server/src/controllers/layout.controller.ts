import cloudinary from "cloudinary";
import { NextFunction, Request, Response } from "express";

import { CatchAsyncError } from "../middlewares/catchAsyncErrors";
import LayoutModel from "../models/layout.model";
import ErrorHandler from "../utils/errorHandler";

export const createLayout = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;

      if (type === "Banner") {
        const { title, subtitle, image } = req.body;
        const myCloud = await cloudinary.v2.uploader.upload(image, {
          folder: "layout",
        });

        const bannerData = {
          image: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          },
          title,
          subtitle,
        };

        const banner = await LayoutModel.create(bannerData);

        res.status(201).json({
          success: true,
          message: "Banner created successfully",
          banner,
        });
      }

      if (type === "FAQ") {
        const { faq } = req.body;

        const faqData = await LayoutModel.create(faq);

        res.status(201).json({
          success: true,
          message: "FAQ created successfully",
          faq: faqData,
        });
      }

      if (type === "Category") {
        const { category } = req.body;

        const categoryData = await LayoutModel.create(category);

        res.status(201).json({
          success: true,
          message: "Category created successfully",
          category: categoryData,
        });
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
