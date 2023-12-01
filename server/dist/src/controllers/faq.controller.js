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
exports.deleteFaq = exports.updateFaq = exports.getFaq = exports.createFaq = void 0;
const catchAsyncErrors_1 = require("../middlewares/catchAsyncErrors");
const faq_model_1 = __importDefault(require("../models/faq.model"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
//create faq
exports.createFaq = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { question, answer } = req.body;
        const faq = yield faq_model_1.default.create({
            question,
            answer,
        });
        res.status(201).json({
            success: true,
            faq: faq,
        });
    }
    catch (error) {
        return next(new errorHandler_1.default(error.message, 500));
    }
}));
//get faq
exports.getFaq = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const faq = yield faq_model_1.default.find();
        res.status(201).json({
            success: true,
            faq: faq,
        });
    }
    catch (error) {
        return next(new errorHandler_1.default(error.message, 500));
    }
}));
//update faq
exports.updateFaq = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { question, answer } = req.body;
        const faq = yield faq_model_1.default.findByIdAndUpdate(req.params.id, {
            question,
            answer,
        }, { new: true });
        res.status(201).json({
            success: true,
            faq: faq,
        });
    }
    catch (error) {
        return next(new errorHandler_1.default(error.message, 500));
    }
}));
//delete faq
exports.deleteFaq = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const faq = yield faq_model_1.default.findByIdAndDelete(id);
        res.status(201).json({
            success: true,
            faq: faq,
        });
    }
    catch (error) {
        return next(new errorHandler_1.default(error.message, 500));
    }
}));
