import express from "express";
import { createOrder } from "../controllers/order.controller";
import { isAuthenticated } from "../helpers/auth";

const orderRouter = express.Router();

orderRouter.post("/create-order", isAuthenticated, createOrder);

export default orderRouter;
