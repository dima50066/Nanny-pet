import mongoose, { Document, Schema, Types } from "mongoose";

export interface Appointment extends Document {
  nannyId: Types.ObjectId;
  userId: Types.ObjectId;
  date: Date;
  address: string;
  phone: string;
  childAge: number;
  email: string;
  parentName: string;
  meetingTime: string;
  comment: string;
}

const AppointmentSchema: Schema = new Schema(
  {
    nannyId: { type: Types.ObjectId, ref: "nannies", required: true },
    userId: { type: Types.ObjectId, ref: "users", required: true },
    date: { type: Date, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    childAge: { type: Number, required: true },
    email: { type: String, required: true },
    parentName: { type: String, required: true },
    meetingTime: { type: String, required: true },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const AppointmentsCollection = mongoose.model<Appointment>(
  "appointments",
  AppointmentSchema
);
