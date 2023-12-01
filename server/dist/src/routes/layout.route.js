"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const layout_controller_1 = require("../controllers/layout.controller");
const auth_1 = require("../helpers/auth");
const layoutRoute = express_1.default.Router();
layoutRoute.post("/create-banner", auth_1.isAuthenticated, (0, auth_1.authorizedUser)("admin"), layout_controller_1.createBanner);
layoutRoute.get("/get-banner", auth_1.isAuthenticated, (0, auth_1.authorizedUser)("admin"), layout_controller_1.getBanner);
layoutRoute.put("/update-banner/:id", auth_1.isAuthenticated, (0, auth_1.authorizedUser)("admin"), layout_controller_1.updateBanner);
layoutRoute.delete("/delete-banner/:id", auth_1.isAuthenticated, (0, auth_1.authorizedUser)("admin"), layout_controller_1.deleteBanner);
exports.default = layoutRoute;
