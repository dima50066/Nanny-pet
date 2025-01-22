import { AppointmentsCollection } from "../db/models/appointment";
import createHttpError from "http-errors";

export const createAppointment = async (payload: {
  userId: string;
  nannyId: string;
  date: Date;
  address: string;
  phone: string;
  childAge: number;
  email: string;
  parentName: string;
  meetingTime: string;
  comment: string;
}) => {
  return await AppointmentsCollection.create(payload);
};

export const getAppointmentsByUserId = async (userId: string) => {
  const appointments = await AppointmentsCollection.find({ userId });
  if (!appointments || appointments.length === 0) {
    throw createHttpError(404, "No appointments found for this user");
  }
  return appointments;
};

export const updateAppointment = async (
  appointmentId: string,
  updates: Partial<{
    date: Date;
    address: string;
    phone: string;
    childAge: number;
    email: string;
    parentName: string;
    meetingTime: string;
    comment: string;
  }>
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
