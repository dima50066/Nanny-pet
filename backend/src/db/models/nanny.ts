import mongoose, { Document, Model, Schema } from "mongoose";

interface INanny extends Document {
  name: string;
  avatar_url: string;
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
  characters: string[];
  rating: number;
}

const nannySchema = new Schema<INanny>({
  name: { type: String, required: true },
  avatar_url: { type: String, required: true },
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
  rating: { type: Number, required: true },
});

const Nanny: Model<INanny> = mongoose.model<INanny>("Nanny", nannySchema);

export default Nanny;
