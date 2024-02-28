import { Request, Response } from "express";
import {
  createUser,
  retrieveUser,
  updateToken,
  updateUser,
} from "../Daos/userDao";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bycrpt from "bcrypt";
import { validationResult } from 'express-validator';


dotenv.config();

export const createToken = (email: string): string => {
  const secretToken = process.env.SECRET_KEY;
  if (!secretToken) {
    throw new Error("Secret token not found in environment variables");
  }
  const token = jwt.sign({ email }, secretToken, { expiresIn: "1h" });
  return token;
};

export const createUserController = async (req: Request, res: Response) => {
    try {
    const { name, email, avatar, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: "enter valid email" });
    }
    const hashedpassword: string = await bycrpt.hash(password, 2);
    const setStatus = "Not Approved";
    const token: string = createToken(email);
    await createUser(name, email, avatar, token, hashedpassword, setStatus);

    console.log("User created successfully");

    res.status(200).json({ "access token": token });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "An error occurred while creating the user" });
  }
};

export const userLoginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await retrieveUser(email);
  if (!user) return res.status(401).json({ msg: "not found" });
  const comparepass: boolean = await bycrpt.compare(password, user.password);

  if (!comparepass)
    return res.status(401).json({ msg: "incorrect credentials" });
  const token: string = createToken(email);
  await updateToken(email, token);
  return res.status(200).json({ access_token: token });
};

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const { name, email, avatar, new_password } = req.body;
    await updateUser(email, name, avatar, new_password);
    console.log("updated");
    return res.json({ status: "success" });
  } catch (error) {
    return res.status(404).json({ details: "send full details" });
  }
};

export const retrievedUserDetailController = async (
  req: Request,
  res: Response
) => {
  try {
    const decoded_token = res.locals.user;
    const email: string = decoded_token.email;
    const details = await retrieveUser(email);
    if (!details) return res.json({ msg: "not found" });
    const userDetails = {
        name: details.name,
        email: details.email,
        avatar: details.avatar,
      };
  
      return res.json({ msg: userDetails });
  } catch (error) {
    console.error(error);
    return res.status(404).send(error);
  }
};
