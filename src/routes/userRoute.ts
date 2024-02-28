import express from "express";
import {createUserController, retrievedUserDetailController, updateUserController,userLoginController} from "../controllers/userCrud"
import { deleteUserController } from "../controllers/deleteUserController";
import { protectedRoute } from "../middlewares/auth"
import { validateEmail } from '../validators/emailvalidator';

export const userRouter = express.Router();

userRouter.post('/createusers',validateEmail,createUserController);
userRouter.post('/loginUser', userLoginController);
userRouter.post("/updateuser",protectedRoute,updateUserController);
userRouter.get("/retriveuser",protectedRoute,retrievedUserDetailController);
userRouter.post("/deleteuser",protectedRoute,deleteUserController);
