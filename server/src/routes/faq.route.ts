import express from "express";
import {
  createFaq,
  deleteFaq,
  getFaq,
  updateFaq,
} from "../controllers/faq.controller";
import { authorizedUser, isAuthenticated } from "../helpers/auth";

const faqRouter = express.Router();

faqRouter.get("/get-faq", isAuthenticated, authorizedUser("admin"), getFaq);
faqRouter.post(
  "/create-faq",
  isAuthenticated,
  authorizedUser("admin"),
  createFaq
);
faqRouter.put(
  "/update-faq/:id",
  isAuthenticated,
  authorizedUser("admin"),
  updateFaq
);
faqRouter.delete(
  "/delete-faq/:id",
  isAuthenticated,
  authorizedUser("admin"),
  deleteFaq
);

export default faqRouter;
