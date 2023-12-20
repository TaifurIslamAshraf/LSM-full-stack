import mongoose from "mongoose";
import config from "./config";
import { logger } from "./logger";

const connectDB = () => {
  mongoose
    .connect(config.dbUrl as string)
    .then(() => {
      logger.info(`Mongodb is Connected`);
    })
    .catch((err) => {
      logger.error(`[MONGODB] -- ${err}`);
      process.exit(1);
    });
};

export default connectDB;
