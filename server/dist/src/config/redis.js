"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = void 0;
const ioredis_1 = require("ioredis");
const config_1 = __importDefault(require("./config"));
const redisClient = () => {
    if (config_1.default.redisUrl) {
        console.log("Redis is connected");
        return config_1.default.redisUrl;
    }
    throw new Error("Redis connection failed");
};
exports.redis = new ioredis_1.Redis(redisClient());
