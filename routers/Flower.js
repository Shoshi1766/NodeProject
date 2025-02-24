import { Router } from "express";
import {
    getAllFlowers,
    getFlowerById,
    addFlower,
    deleteFlowerById,
    updateFlowerById,
    getCountOfPages
} from '../controllers/Flower.js';

const flowerRouter = Router();
flowerRouter.get("/", getAllFlowers);
flowerRouter.get("/count",getCountOfPages)
flowerRouter.get("/:id", getFlowerById);
flowerRouter.post("/",addFlower);
flowerRouter.delete("/:id",deleteFlowerById);
flowerRouter.put("/:id",updateFlowerById);

export default flowerRouter;
