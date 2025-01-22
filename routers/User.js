import {Router} from "express";
import {
    getAllUsers,
    getUserByTz,
    addUser,
    updateUserByIdWithoutUpdatePassword,
    updatePasswordById,
    getUserByFullNameAndPasswordAndByPost
} from '../controllers/User.js';
 
const userRouter= Router();
userRouter.get("/",getAllUsers);
userRouter.get("/:tz",getUserByTz);
userRouter.post("/",addUser);
userRouter.put("/updateWithoutPassword/:tz",updateUserByIdWithoutUpdatePassword);
userRouter.put("/:tz",updatePasswordById);
userRouter.post("/getUserByFullNameAndPassword",getUserByFullNameAndPasswordAndByPost);

export default userRouter;