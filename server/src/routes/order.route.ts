import express from "express";
import { createOrder, getAllOrders } from "../controllers/order.controller";
import { authorizedUser, isAuthenticated } from "../helpers/auth";

const orderRouter = express.Router();

orderRouter.post("/create-order", isAuthenticated, createOrder);
orderRouter.get(
  "/all-orders",
  isAuthenticated,
  authorizedUser("admin"),
  getAllOrders
);

export default orderRouter;
