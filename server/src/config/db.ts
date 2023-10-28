import mongoose from "mongoose";
import config from "./config";

const connectDB = () => {
  mongoose
    .connect(config.dbUrl as string)
    .then(() => {
      console.log(`Mongodb is Connected`);
    })
    .catch((err) => {
      console.log(`[MONGODB] -- ${err}`);
      process.exit(1);
    });
};

export default connectDB;
