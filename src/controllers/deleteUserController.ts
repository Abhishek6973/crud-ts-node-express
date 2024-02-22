import { Request, Response } from "express";
import { deleteUser } from "../Daos/userDao";




export const deleteUserController = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const deletedUser= await deleteUser(email);
        
        if (!deletedUser) {
            return res.status(404).json({ "msg": "User not found" });
        }
        return res.json({ "msg": "Deleted successfully", "deletedUser": deletedUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "error": "Internal server error" });
    }
};

