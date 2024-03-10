import { Admin } from "../models/amdin";
import { User } from "../models/users";


export const createAdmin = async (email: string, password: string) => {
    return await Admin.create({email: email, password: password})
}

export const retriveAdmin= async (email:string) =>{
    return await Admin.findOne({email:email})
}

export const tokenupdate = async(email : string , token: string) => {
    return await Admin.findOneAndUpdate({email:email},{ $set: { token: token } },{ new: true, upsert: true })
}
export const checkUpdateStatus = async (email: string) => {
    try {
        let user = await User.findOne({ email: email });
        if (user) {
            user = await User.findOneAndUpdate(
                { email: email },
                { $set: { status: "approved" } },
                { new: true, upsert: true }
            );
            return user
        }
        return [];
    } catch (error) {
        console.error("Error in checkUpdateStatus:", error);
        return null;
    }
};