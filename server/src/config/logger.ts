import winston, { format } from "winston";
require("winston-mongodb");
const { combine, timestamp, label, printf, colorize } = format;

// let options = {
//   db: mongoose.connection.useDb("loggerDatabase"),
//   options: { useUnifiedTopology: true },
//   collection: "logs",
//   capped: false,
//   expireAfterSeconds: 2592000,
//   leaveConnectionOpen: false,
//   storHost: false,
//   metakey: "additionalInfo",
// };

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

export const logger = winston.createLogger({
  level: "info",
  format: combine(label({ label: "info" }), timestamp(), myFormat, colorize()),

  transports: [
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: combine(
        label({ label: "info" }),
        timestamp(),
        myFormat,
        colorize()
      ),
    })
  );
}
