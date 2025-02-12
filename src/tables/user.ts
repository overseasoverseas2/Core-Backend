import { model, Document, Schema } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
  email: string;
  created: Date;
  banned: boolean;
  accountId: string;
}

const userSchema = new Schema<IUser>({
  accountId: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  created: { type: Date, default: Date.now },
  banned: { type: Boolean, default: false },
});

const User = model<IUser>("User", userSchema);

export default User;
