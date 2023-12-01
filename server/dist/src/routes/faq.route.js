"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const faq_controller_1 = require("../controllers/faq.controller");
const auth_1 = require("../helpers/auth");
const faqRouter = express_1.default.Router();
faqRouter.get("/get-faq", auth_1.isAuthenticated, (0, auth_1.authorizedUser)("admin"), faq_controller_1.getFaq);
faqRouter.post("/create-faq", auth_1.isAuthenticated, (0, auth_1.authorizedUser)("admin"), faq_controller_1.createFaq);
faqRouter.put("/update-faq/:id", auth_1.isAuthenticated, (0, auth_1.authorizedUser)("admin"), faq_controller_1.updateFaq);
faqRouter.delete("/delete-faq/:id", auth_1.isAuthenticated, (0, auth_1.authorizedUser)("admin"), faq_controller_1.deleteFaq);
exports.default = faqRouter;
