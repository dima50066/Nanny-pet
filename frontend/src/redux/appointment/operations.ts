import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../hooks/axiosConfig";
import { AppointmentResponse, AxiosErrorResponse } from "../../types";

export const createAppointment = createAsyncThunk(
  "appointment/create",
  async (
    appointmentData: { nannyId: string; date: Date; message: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post<AppointmentResponse>(
        "/appointments",
        appointmentData
      );
      return response.data.data;
    } catch (error) {
      const err = error as AxiosErrorResponse;
      return rejectWithValue(
        err.response?.data.message || "Failed to create appointment"
      );
    }
  }
);

export const updateAppointment = createAsyncThunk(
  "appointment/update",
  async (
    {
      id,
      updates,
    }: { id: string; updates: Partial<{ date: Date; message: string }> },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.patch<AppointmentResponse>(
        `/appointments/${id}`,
        updates
      );
      return response.data.data;
    } catch (error) {
      const err = error as AxiosErrorResponse;
      return rejectWithValue(
        err.response?.data.message || "Failed to update appointment"
      );
    }
  }
);

export const deleteAppointment = createAsyncThunk(
  "appointment/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/appointments/${id}`);
      return id;
    } catch (error) {
      const err = error as AxiosErrorResponse;
      return rejectWithValue(
        err.response?.data.message || "Failed to delete appointment"
      );
    }
  }
);
