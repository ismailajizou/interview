import { hash } from "argon2";
import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  isOnline: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
    isOnline: { type: Boolean, default: false }
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  //   hash the password before saving it to the database
  this.password = await hash(this.password);
  next();
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
