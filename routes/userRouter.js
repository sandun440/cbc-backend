import express from 'express';
import { createUser, getUser, getAllUsers, googleLogin, loginUser, updateUserType, changeUserInfo, getUserCount } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get("/", getUser);
userRouter.get("/customers", getAllUsers);
userRouter.get("/count", getUserCount);
userRouter.post("/signup", createUser);
userRouter.post("/login", loginUser);
userRouter.post("/google", googleLogin);
userRouter.put("/:email", updateUserType);
userRouter.put("/update", changeUserInfo);

export default userRouter;
