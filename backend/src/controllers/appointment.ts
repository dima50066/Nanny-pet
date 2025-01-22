import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../types";
import {
  createAppointment,
  getAppointmentsByUserId,
  updateAppointment,
  deleteAppointment,
} from "../services/appointment";

export const createAppointmentController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?._id?.toString();
    const {
      nannyId,
      date,
      address,
      phone,
      childAge,
      email,
      parentName,
      meetingTime,
      comment,
    } = req.body;

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const appointment = await createAppointment({
      userId,
      nannyId,
      date,
      address,
      phone,
      childAge,
      email,
      parentName,
      meetingTime,
      comment,
    });

    res.status(201).json({
      status: 201,
      message: "Appointment created successfully!",
      data: appointment,
    });
  } catch (error) {
    next(error);
  }
};

export const getAppointmentsController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?._id?.toString();

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const appointments = await getAppointmentsByUserId(userId);

    res.status(200).json({
      status: 200,
      message: "Appointments retrieved successfully!",
      data: appointments,
    });
  } catch (error) {
    next(error);
  }
};

export const updateAppointmentController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const appointment = await updateAppointment(id, updates);

    res.status(200).json({
      status: 200,
      message: "Appointment updated successfully!",
      data: appointment,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAppointmentController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    await deleteAppointment(id);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
