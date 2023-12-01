"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config"));
const connectDB = () => {
    mongoose_1.default
        .connect(config_1.default.dbUrl)
        .then(() => {
        console.log(`Mongodb is Connected`);
    })
        .catch((err) => {
        console.log(`[MONGODB] -- ${err}`);
        process.exit(1);
    });
};
exports.default = connectDB;
