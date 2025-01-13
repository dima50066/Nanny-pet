import { AppointmentsCollection } from "../db/models/appointment";
import createHttpError from "http-errors";

export const createAppointment = async (payload: {
  userId: string;
  nannyId: string;
  date: Date;
  message: string;
}) => {
  return await AppointmentsCollection.create(payload);
};

export const getAppointmentById = async (appointmentId: string) => {
  const appointment = await AppointmentsCollection.findById(appointmentId);
  if (!appointment) {
    throw createHttpError(404, "Appointment not found");
  }
  return appointment;
};

export const updateAppointment = async (
  appointmentId: string,
  updates: Partial<{ date: Date; message: string }>
) => {
  const appointment = await AppointmentsCollection.findByIdAndUpdate(
    appointmentId,
    updates,
    { new: true }
  );
  if (!appointment) {
    throw createHttpError(404, "Appointment not found");
  }
  return appointment;
};

export const deleteAppointment = async (appointmentId: string) => {
  const result = await AppointmentsCollection.findByIdAndDelete(appointmentId);
  if (!result) {
    throw createHttpError(404, "Appointment not found");
  }
  return result;
};
