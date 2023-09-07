import { Redis } from "ioredis";

import config from "./config";

const redisClient = () => {
  if (config.redisUrl) {
    console.log("Redis is connected");
    return config.redisUrl;
  }

  throw new Error("Redis connection failed");
};

export const redis = new Redis(redisClient());
