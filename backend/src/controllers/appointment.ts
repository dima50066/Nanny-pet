import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../types";
import {
  createAppointment,
  getAppointmentById,
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
    const { nannyId, date, message } = req.body;

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const appointment = await createAppointment({
      userId,
      nannyId,
      date,
      message,
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

export const updateAppointmentController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const appointment = await updateAppointment(id, updates);

    res.json({
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
