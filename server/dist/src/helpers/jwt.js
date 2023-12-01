"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendToken = exports.refreshToeknOption = exports.accessTokenOption = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = __importDefault(require("../config/config"));
const redis_1 = require("../config/redis");
dotenv_1.default.config();
//parse env var to intrigate with falback value
const accessTokenExpire = parseInt(config_1.default.accessTokenExpire || "300", 10);
const refreshTokenExpire = parseInt(config_1.default.refreshToeknExpire || "1200", 10);
//options for cookies
exports.accessTokenOption = {
    expires: new Date(Date.now() + accessTokenExpire * 60 * 1000),
    maxAge: accessTokenExpire * 60 * 1000,
    httpOnly: true,
    sameSite: "lax",
};
exports.refreshToeknOption = {
    expires: new Date(Date.now() + refreshTokenExpire * 24 * 60 * 60 * 1000),
    maxAge: refreshTokenExpire * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "lax",
};
const sendToken = (user, statusCode, res) => {
    const accessToken = user.accessToken();
    const refreshToken = user.refreshToken();
    //upload session to redis
    redis_1.redis.set(user._id, JSON.stringify(user));
    //only set secure to true in production
    if (process.env.NODE_ENV === "production") {
        exports.accessTokenOption.secure = true;
    }
    res.cookie("access_token", accessToken, exports.accessTokenOption);
    res.cookie("refresh_token", refreshToken, exports.refreshToeknOption);
    res.status(statusCode).json({
        success: true,
        user,
        accessToken,
    });
};
exports.sendToken = sendToken;
