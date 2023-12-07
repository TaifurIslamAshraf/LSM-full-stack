import dotenv from "dotenv";

dotenv.config();

const config = {
  PORT: process.env.PORT,
  origin: process.env.ORIGIN,
  clientUrl: process.env.CLIENT_URL,

  dbUrl: process.env.DB_URI,
  redisUrl: process.env.REDIS_URL,

  cloudName: process.env.CLOUD_NAME,
  cloudApiKey: process.env.CLOUD_API_KEY,
  cloudApiSecret: process.env.CLOUD_API_SECRET,

  jwtSecret: process.env.JWT_SECRET as string,
  activationSecret: process.env.ACTIVATION_SECRET as string,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET as string,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET as string,
  accessTokenExpire: process.env.ACCESS_TOKEN_EXPIRE as string,
  refreshToeknExpire: process.env.REFRESH_TOKEN_EXPIRE as string,

  smtpHost: process.env.SMTP_HOST,
  smtpPort: parseInt(process.env.SMTP_PORT || "587"),
  smtpService: process.env.SMTP_SERVICE,
  smtpMail: process.env.SMTP_MAIL,
  smtpPassword: process.env.SMTP_PASSWORD,
};

export default config;
