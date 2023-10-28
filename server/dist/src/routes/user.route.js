"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const auth_1 = require("../helpers/auth");
const router = express_1.default.Router();
router.post("/register", user_controller_1.registerUser);
router.post("/activation", user_controller_1.activateUser);
router.post("/login", user_controller_1.loginUser);
router.get("/logout", auth_1.isAuthenticated, user_controller_1.logoutUser);
exports.default = router;
