import express from "express"
import { createAdminController, adminlogincontroller, userapprove} from "../controllers/admincontroller"
import { protectedRoute } from "../middlewares/auth";
import { validateEmail } from '../validators/emailvalidator';

export const AdminRouter = express.Router()

AdminRouter.post("/createAdmin",validateEmail, createAdminController);
AdminRouter.post("/adminlogin", adminlogincontroller);
AdminRouter.post("/updateStatus",protectedRoute,userapprove);