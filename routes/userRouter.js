import express from 'express';
import { createUser, getUser, getAllUsers, googleLogin, loginUser, updateUserType } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get("/", getUser);
userRouter.get("/customers", getAllUsers);
userRouter.post("/signup", createUser);
userRouter.post("/login", loginUser);
userRouter.post("/google", googleLogin);
userRouter.put("/:email", updateUserType);

export default userRouter;
