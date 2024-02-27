import express from "express";
import {createUserController, retrievedUserDetailController, updateUserController,userLoginController} from "../controllers/userCrud"
import { deleteUserController } from "../controllers/deleteUserController";
import { protectedRoute } from "../middlewares/auth"

export const router = express.Router();

router.post('/createusers',createUserController);
router.post('/loginUser', userLoginController);
router.post("/updateuser",protectedRoute,updateUserController);
router.post("/retriveuser",protectedRoute,retrievedUserDetailController);
router.post("/deleteuser",protectedRoute,deleteUserController);
