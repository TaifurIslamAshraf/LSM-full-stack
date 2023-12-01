"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const app_1 = require("./app");
const config_1 = __importDefault(require("./src/config/config"));
//setup cloudinary config
cloudinary_1.v2.config({
    cloud_name: config_1.default.cloudName,
    api_key: config_1.default.cloudApiKey,
    api_secret: config_1.default.cloudApiSecret,
});
app_1.app.listen(config_1.default.PORT, () => {
    console.log(`Server is running at http://localhost:${config_1.default.PORT}`);
});
