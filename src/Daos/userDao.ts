import { User } from "../models/users";
import bcrypt from 'bcrypt';

export const createUser = async (name: string, email: string, avatar: string, token:string, password:string) => {
    return await User.create({ email, name, avatar, token, password});
};

export const updateUser = async (email: string, newName: string, newAvatar: string, newPassword: string) => {
    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10); 
        const updatedUser = await User.findOneAndUpdate(
            { email },
            { name: newName, avatar: newAvatar, password: hashedPassword }, 
            { new: true }
        );
        console.log(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        throw error; 
    }
};

export const deleteUser =  async (email: string) => {
        return await User.findOneAndDelete({ email });

};

export const retrieveUser = async (email: string) => {
    return await User.findOne({ email: email }); 
}

export const updateToken = async( email: string, token:string) =>{
    return await User.findOne({email:email }).set({token:token});
}