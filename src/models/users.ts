import { Schema, model} from 'mongoose';
interface IUser {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  token?: string;
}
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true},
  password: {type: String, required: true},
  avatar: String,
  token: String
});

export const User = model<IUser>('User', userSchema);
 