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
};
exports.default = config;
