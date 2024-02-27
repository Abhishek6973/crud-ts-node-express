import { NextFunction, Request, Response } from "express";
import { User } from "../models/users";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
config()


export const protectedRoute = (req:Request, res: Response, next:NextFunction) =>{
    const authHeader: string|undefined = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({"status":"add token"})
    }
    const token: string = authHeader.split(' ')[1];

    try {
        const secretToken:any = process.env.SECRET_KEY;
        User.findOne({token :token}).then(()=>{
        }).catch((err)=>{
            return res.status(401).json({ message: 'Invalid token' });
        })
        const decodedToken = jwt.verify(token, secretToken);
        res.locals.user = decodedToken
        next();

    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

