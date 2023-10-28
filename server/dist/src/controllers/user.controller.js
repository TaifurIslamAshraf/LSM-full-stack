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
exports.logoutUser = exports.loginUser = exports.activateUser = exports.registerUser = void 0;
const ejs_1 = __importDefault(require("ejs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("../config/config"));
const redis_1 = require("../config/redis");
const activationToken_1 = require("../helpers/activationToken");
const jwt_1 = require("../helpers/jwt");
const sendMail_1 = __importDefault(require("../helpers/sendMail"));
const catchAsyncErrors_1 = require("../middlewares/catchAsyncErrors");
const user_model_1 = __importDefault(require("../models/user.model"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
exports.registerUser = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //get data from body
        const { name, email, password, avatar } = req.body;
        //is Exist email
        const isExist = yield user_model_1.default.exists({ email });
        if (isExist) {
            return next(new errorHandler_1.default("User alredy exist", 400));
        }
        //send activation email
        const activationInfo = {
            name,
            email,
            password,
            avatar,
        };
        const { token, activationCode } = (0, activationToken_1.createActivationToken)(activationInfo);
        const data = {
            user: { name: activationInfo.name },
            activationCode: activationCode,
        };
        const html = yield ejs_1.default.renderFile(path_1.default.join(__dirname, "../../views/email.ejs"), data);
        try {
            yield (0, sendMail_1.default)({
                email: activationInfo.email,
                subject: "Activate your account",
                templete: "email.ejs",
                data,
            });
            res.status(200).json({
                success: true,
                message: `Please check your email: ${activationInfo.email} to activate your account`,
                activationToken: token,
            });
        }
        catch (error) {
            return next(new errorHandler_1.default(error.message, 400));
        }
    }
    catch (error) {
        return next(new errorHandler_1.default(error.message, 400));
    }
}));
//activate user
exports.activateUser = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { activation_token, activation_code } = req.body;
        if (!activation_code && !activation_token) {
            return next(new errorHandler_1.default("all field are required", 400));
        }
        //veryfy token and get user info
        const newUser = jsonwebtoken_1.default.verify(activation_token, config_1.default.activationSecret);
        if (newUser.activationCode !== activation_code) {
            return next(new errorHandler_1.default("Invalid activation code", 400));
        }
        //user data save in database
        const { name, email, password, avatar } = newUser.user;
        const existUser = yield user_model_1.default.exists({ email });
        if (existUser) {
            return next(new errorHandler_1.default("User alredy exist", 400));
        }
        const user = yield user_model_1.default.create({
            name,
            email,
            password,
            avatar,
        });
        res.status(201).json({
            success: true,
            message: "User registretion success",
            user,
        });
    }
    catch (error) {
        return next(new errorHandler_1.default(error.message, 400));
    }
}));
//login user
exports.loginUser = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email && !password) {
            return next(new errorHandler_1.default("All field are required", 400));
        }
        const user = yield user_model_1.default.findOne({ email }).select("+password");
        if (!user) {
            return next(new errorHandler_1.default("Invalid email or password", 400));
        }
        const isPasswordMatch = yield user.comparePassword(password);
        if (!isPasswordMatch) {
            return next(new errorHandler_1.default("Invalid email or password", 400));
        }
        (0, jwt_1.sendToken)(user, 200, res);
    }
    catch (error) {
        return next(new errorHandler_1.default(`User -- ${error.message}`, 400));
    }
}));
//logout user
exports.logoutUser = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        res.cookie("access_token", "", { maxAge: 1 });
        res.cookie("refresh_token", "", { maxAge: 1 });
        const userId = ((_a = req.user) === null || _a === void 0 ? void 0 : _a._id) || "";
        redis_1.redis.del(userId);
        res.status(200).json({
            success: true,
            message: "Logout successfull",
        });
    }
    catch (error) {
        return next(new errorHandler_1.default(`User -- ${error.message}`, 400));
    }
}));
