import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} from "../controllers/category.controller";
import { authorizedUser, isAuthenticated } from "../helpers/auth";

const categoryRouter = express.Router();

categoryRouter.get(
  "/get-category",
  isAuthenticated,
  authorizedUser("admin"),
  getCategory
);
categoryRouter.post(
  "/create-category",
  isAuthenticated,
  authorizedUser("admin"),
  createCategory
);
categoryRouter.put(
  "/update-category/:id",
  isAuthenticated,
  authorizedUser("admin"),
  updateCategory
);
categoryRouter.delete(
  "/delete-category/:id",
  isAuthenticated,
  authorizedUser("admin"),
  deleteCategory
);

export default categoryRouter;
