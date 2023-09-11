import dotenv from "dotenv";

dotenv.config();

const config = {
  PORT: process.env.PORT,
  origin: process.env.ORIGIN,

  dbUrl: process.env.DB_URI,
  redisUrl: process.env.REDIS_URL,

  cloudName: process.env.CLOUD_NAME,
  cloudApiKey: process.env.CLOUD_API_KEY,
  cloudApiSecret: process.env.CLOUD_API_SECRET,

  jwtSecret: process.env.JWT_SECRET as string,
  activationToken: process.env.ACTIVATION_TOKEN as string,
};

export default config;
