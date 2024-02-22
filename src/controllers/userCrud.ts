import { Request, Response } from "express";
import {createUser, retrieveUser, updateUser} from "../Daos/userDao"

export const createUserController = async (req: Request, res: Response)=> {
    try {
    const {name, email, avatar} = req.body;
    await createUser(name, email, avatar)
    console.log("created")
    return res.json({"status": "success"})
    } catch (error) {
        return res.status(404).json({"details":"send full details"})
    }
    
};

export const updateUserController = async (req: Request, res: Response) =>{
    try {
        const {name, email, avatar} = req.body;
        await updateUser(email,name,avatar);
        console.log("updated")
        return res.json({"status": "success"})
        } catch (error) {
            return res.status(404).json({"details":"send full details"})
        }
};

export const retrievedUserDetailController = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        console.log(email)
        const details = await retrieveUser(email);
        if(details.length > 0)
            return res.json({ "msg": details });
        return res.json({"msg":"not found"})
    } catch (error) {
        console.error(error);
        return res.status(404).send(error); 
    }
}

