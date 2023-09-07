"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const config_1 = __importDefault(require("./src/config/config"));
app_1.app.listen(config_1.default.PORT, () => {
    console.log(`Server is running at http://localhost:${config_1.default.PORT}`);
});
