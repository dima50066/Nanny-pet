import mongoose, { Document, Schema, Types } from "mongoose";

export interface Nanny extends Document {
  userId: Types.ObjectId;
  name: string;
  avatar: string;
  birthday: Date;
  experience: string;
  reviews: {
    reviewer: string;
    rating: number;
    comment: string;
  }[];
  education: string;
  kids_age: string;
  price_per_hour: number;
  location: string;
  about: string;
  characters: string[] | string;
  rating: number;
}

const NannySchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
    name: { type: String, required: true },
    avatar: {
      type: String,
      required: true,
      default:
        "https://res.cloudinary.com/divyszzpf/image/upload/v1738067029/NannyProject/wzlwgo5ldvnylylapzlx.webp",
    },
    birthday: { type: Date, required: true },
    experience: { type: String, required: true },
    reviews: [
      {
        reviewer: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
      },
    ],
    education: { type: String, required: true },
    kids_age: { type: String, required: true },
    price_per_hour: { type: Number, required: true },
    location: { type: String, required: true },
    about: { type: String, required: true },
    characters: { type: [String], required: true },
    rating: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const NanniesCollection = mongoose.model<Nanny>("nannies", NannySchema);
