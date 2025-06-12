import { Router } from "express";
import {
    getAllOrders,
    addOrder,
    deleteOrderById,
    getAllOrdersByUserId,
    updateOrderToSendingById
} from '../controllers/Order.js'
import { verifyToken } from "../utils/createToken.js";

const orderRouter = Router();
orderRouter.get("/", getAllOrders);
orderRouter.post("/", addOrder);
orderRouter.delete("/:id", deleteOrderById);
orderRouter.get("/:userId", getAllOrdersByUserId);
orderRouter.put("/:id", updateOrderToSendingById);

export default orderRouter;