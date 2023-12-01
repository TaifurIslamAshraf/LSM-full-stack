"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBanner = exports.updateBanner = exports.getBanner = exports.createBanner = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const catchAsyncErrors_1 = require("../middlewares/catchAsyncErrors");
const layout_model_1 = __importDefault(require("../models/layout.model"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
//banner create
exports.createBanner = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, subtitle, image } = req.body;
        console.log(subtitle);
        const myCloud = yield cloudinary_1.default.v2.uploader.upload(image, {
            folder: "layout",
        });
        const bannerData = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
            title,
            subtitle,
        };
        const isExistBanner = yield layout_model_1.default.find();
        if (isExistBanner[0]) {
            return next(new errorHandler_1.default("banner alredy exist You can update it", 400));
        }
        const banner = yield layout_model_1.default.create(bannerData);
        res.status(201).json({
            success: true,
            message: "Banner created successfully",
            banner,
        });
    }
    catch (error) {
        return next(new errorHandler_1.default(error.message, 500));
    }
}));
//get banner
exports.getBanner = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const banner = yield layout_model_1.default.find();
        res.status(200).json({
            success: true,
            message: "Banner deleted successfully",
            banner: banner[0],
        });
    }
    catch (error) {
        return next(new errorHandler_1.default(error.message, 500));
    }
}));
//update banner
exports.updateBanner = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, subtitle, image } = req.body;
        const bannerData = {
            title,
            subtitle,
        };
        if (image) {
            const myCloud = yield cloudinary_1.default.v2.uploader.upload(image, {
                folder: "layout",
            });
            bannerData.public_id = myCloud.public_id;
            bannerData.url = myCloud.url;
        }
        const banner = yield layout_model_1.default.findByIdAndUpdate(id, bannerData, {
            new: true,
        });
        if (!banner) {
            return next(new errorHandler_1.default("Banner not found", 404));
        }
        if (image && banner.public_id) {
            cloudinary_1.default.v2.uploader.destroy(banner.public_id);
        }
        res.status(200).json({
            success: true,
            message: "Banner updated successfully",
            banner,
        });
    }
    catch (error) {
        return next(new errorHandler_1.default(error.message, 500));
    }
}));
//delete banner
exports.deleteBanner = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const banner = yield layout_model_1.default.findByIdAndDelete(id);
        if (banner && banner.public_id) {
            yield cloudinary_1.default.v2.uploader.destroy(banner.public_id);
        }
        res.status(200).json({
            success: true,
            message: "Banner deleted successfully",
        });
    }
    catch (error) {
        return next(new errorHandler_1.default(error.message, 500));
    }
}));
