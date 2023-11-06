import cloudinary from "cloudinary";
import { NextFunction, Request, Response } from "express";

import { IBannerImg } from "../../@types/layout";
import { CatchAsyncError } from "../middlewares/catchAsyncErrors";
import BannerModel from "../models/layout.model";
import ErrorHandler from "../utils/errorHandler";

//banner create
export const createBanner = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, subtitle, image } = req.body;
      console.log(subtitle);
      const myCloud = await cloudinary.v2.uploader.upload(image, {
        folder: "layout",
      });

      const bannerData = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
        title,
        subtitle,
      };

      const isExistBanner = await BannerModel.find();
      if (isExistBanner[0]) {
        return next(
          new ErrorHandler("banner alredy exist You can update it", 400)
        );
      }

      const banner = await BannerModel.create(bannerData);

      res.status(201).json({
        success: true,
        message: "Banner created successfully",
        banner,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//get banner
export const getBanner = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const banner = await BannerModel.find();

      res.status(200).json({
        success: true,
        message: "Banner deleted successfully",
        banner: banner[0],
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//update banner
export const updateBanner = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { title, subtitle, image } = req.body;

      const bannerData: IBannerImg = {
        title,
        subtitle,
      };

      if (image) {
        const myCloud = await cloudinary.v2.uploader.upload(image, {
          folder: "layout",
        });

        bannerData.public_id = myCloud.public_id;
        bannerData.url = myCloud.url;
      }

      const banner = await BannerModel.findByIdAndUpdate(id, bannerData, {
        new: true,
      });
      if (!banner) {
        return next(new ErrorHandler("Banner not found", 404));
      }

      if (image && banner.public_id) {
        cloudinary.v2.uploader.destroy(banner.public_id);
      }

      res.status(200).json({
        success: true,
        message: "Banner updated successfully",
        banner,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//delete banner
export const deleteBanner = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const banner = await BannerModel.findByIdAndDelete(id);

      if (banner && banner.public_id) {
        await cloudinary.v2.uploader.destroy(banner.public_id);
      }

      res.status(200).json({
        success: true,
        message: "Banner deleted successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
