import { User } from "../models/users";

export const createUser = async (name: string, email: string, avatar: string) => {
    return await User.create({ email, name, avatar });
};

export const updateUser =  async(email: string, newName: string, newAvatar: string) => {
        const updateduser =  await User.findOneAndUpdate(
            { email },
            { name: newName, avatar: newAvatar },
            {new : true}
        );
        console.log(updateduser)
};

export const deleteUser =  async (email: string) => {
        return await User.findOneAndDelete({ email });

};

export const retrieveUser = async (email: string) => {
    return await User.find({ email: email }); 
}