import mongoose, { Document, Schema, Types } from "mongoose";
import { Nanny } from "./nanny";

export interface User extends Document {
  email: string;
  password: string;
  favorites: Types.ObjectId[] | Nanny[];
  name?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<User> = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    favorites: [{ type: Schema.Types.ObjectId, ref: "nannies" }],
    name: { type: String },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
    versionKey: false,
  }
);

UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UsersCollection = mongoose.model<User>("users", UserSchema);
