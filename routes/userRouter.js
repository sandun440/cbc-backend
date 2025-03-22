import express from 'express';
import { createUser, getUser, getAllUsers, googleLogin, loginUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get("/", getUser);
userRouter.get("/users", getAllUsers);
userRouter.post("/signup", createUser);
userRouter.post("/login", loginUser);
userRouter.post("/google", googleLogin);

export default userRouter;
