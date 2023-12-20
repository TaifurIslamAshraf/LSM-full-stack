import { Redis } from "ioredis";

import config from "./config";
import { logger } from "./logger";

const redisClient = () => {
  if (config.redisUrl) {
    logger.info("Redis is connected");
    return config.redisUrl;
  }

  throw new Error("Redis connection failed");
};

export const redis = new Redis(redisClient());
