import { Request, Response } from "express";
import { checkUpdateStatus, createAdmin, retriveAdmin, tokenupdate } from "../Daos/adminDao";
import bcrypt from "bcrypt"
import { createToken } from "./userCrud";
import { validationResult } from 'express-validator';


export const createAdminController =async (req:Request, res:Response) =>{
    try{
        const {email, password} = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: "enter valid email" });
        }
        const hashed_password:string = await bcrypt.hash(password, 2);
        await createAdmin(email, hashed_password);
        console.log("data created")
        res.status(200).json({"mag":"data created successfully"});
    }
    catch(error){
        res.status(500).json({"msg":"data creation failed"});
    }
}
export const adminlogincontroller = async (req: Request, res: Response)=>{
    try{
        const details = req.body;
        const admin_details:any= await retriveAdmin(details.email);
        if(!admin_details)
            return res.status(401).json({"msg":"not found"})
        const check_pass:boolean = await bcrypt.compare(details.password, admin_details.password)
        if(!check_pass)
            return res.status(401).json({"msg":"invalid"})
        const token:string = createToken(details.email);
        await tokenupdate(details.email, token);
        return res.status(200).json({"msg":"success","token":token});
    }
    catch(error){
        return res.status(501).json({"msg":"invalid credentials"})
    }
}

export const userapprove = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email }: { email: string } = req.body; 
        const userstatus = await checkUpdateStatus(email); 
        if (!userstatus)
            res.status(402).json({ "msg": "User Not found" });
        else
           res.status(200).json(userstatus);
    } catch (error) {
        console.error("Error in userapprove:", error);
        res.status(401).json({ "msg": "Not approved user" });
    }
};