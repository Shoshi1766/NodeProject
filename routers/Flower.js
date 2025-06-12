import { Router } from "express";
import {
    getAllFlowers,
    getFlowerById,
    addFlower,
    deleteFlowerById,
    updateFlowerById,
    getCountOfPages
} from '../controllers/Flower.js';
import { verifyManager } from "../Middlewares/authMiddleware.js";

const flowerRouter = Router();
flowerRouter.get("/", getAllFlowers);
flowerRouter.get("/count",getCountOfPages);
flowerRouter.get("/:id", getFlowerById);
flowerRouter.post("/",verifyManager,addFlower);
flowerRouter.delete("/:id",verifyManager,deleteFlowerById);
flowerRouter.put("/:id",verifyManager,updateFlowerById);

export default flowerRouter;
