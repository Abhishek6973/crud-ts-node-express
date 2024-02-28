import { Schema, model } from "mongoose";

interface IAdmin {
  email: string;
  password: string;
  token?: string;
}

const adminSchema = new Schema<IAdmin>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  token: { type: String },
});

export const Admin = model<IAdmin>("Admin", adminSchema);
