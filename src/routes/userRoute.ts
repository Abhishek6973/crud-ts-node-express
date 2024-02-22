import express from "express";
import {createUserController, retrievedUserDetailController, updateUserController} from "../controllers/userCrud"
import { deleteUserController } from "../controllers/deleteUserController";

export const router = express.Router();

router.post('/createusers',createUserController);
router.post("/updateuser",updateUserController);
router.post("/retriveuser",retrievedUserDetailController);
router.post("/deleteuser",deleteUserController);