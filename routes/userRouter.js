import express from 'express';
import { createUser, getUser, googleLogin, loginUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get("/", getUser);
userRouter.post("/signup", createUser);
userRouter.post("/login", loginUser)
userRouter.post("/google", googleLogin)

export default userRouter;
