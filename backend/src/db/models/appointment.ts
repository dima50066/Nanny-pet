import mongoose, { Document, Schema, Types } from "mongoose";

export interface Appointment extends Document {
  nannyId: Types.ObjectId;
  userId: Types.ObjectId;
  date: Date;
  message: string;
}

const AppointmentSchema: Schema = new Schema(
  {
    nannyId: { type: Types.ObjectId, ref: "nannies", required: true },
    userId: { type: Types.ObjectId, ref: "users", required: true },
    date: { type: Date, required: true },
    message: { type: String, required: true },
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
