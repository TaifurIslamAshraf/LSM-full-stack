"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("../controllers/category.controller");
const auth_1 = require("../helpers/auth");
const categoryRouter = express_1.default.Router();
categoryRouter.get("/get-category", auth_1.isAuthenticated, (0, auth_1.authorizedUser)("admin"), category_controller_1.getCategory);
categoryRouter.post("/create-category", auth_1.isAuthenticated, (0, auth_1.authorizedUser)("admin"), category_controller_1.createCategory);
categoryRouter.put("/update-category/:id", auth_1.isAuthenticated, (0, auth_1.authorizedUser)("admin"), category_controller_1.updateCategory);
categoryRouter.delete("/delete-category/:id", auth_1.isAuthenticated, (0, auth_1.authorizedUser)("admin"), category_controller_1.deleteCategory);
exports.default = categoryRouter;
