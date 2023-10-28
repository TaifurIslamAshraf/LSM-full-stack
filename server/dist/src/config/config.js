"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    PORT: process.env.PORT,
    origin: process.env.ORIGIN,
    dbUrl: process.env.DB_URI,
    redisUrl: process.env.REDIS_URL,
    cloudName: process.env.CLOUD_NAME,
    cloudApiKey: process.env.CLOUD_API_KEY,
    cloudApiSecret: process.env.CLOUD_API_SECRET,
    jwtSecret: process.env.JWT_SECRET,
    activationSecret: process.env.ACTIVATION_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    accessTokenExpire: process.env.ACCESS_TOKEN_EXPIRE,
    refreshToeknExpire: process.env.REFRESH_TOKEN_EXPIRE,
    smtpHost: process.env.SMTP_HOST,
    smtpPort: parseInt(process.env.SMTP_PORT || "587"),
    smtpService: process.env.SMTP_SERVICE,
    smtpMail: process.env.SMTP_MAIL,
    smtpPassword: process.env.SMTP_PASSWORD,
};
exports.default = config;
