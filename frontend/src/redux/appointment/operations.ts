import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../hooks/axiosConfig";
import { Appointment, AxiosErrorResponse } from "../../types";

export const fetchAppointments = createAsyncThunk(
  "appointments/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/appointments");
      return response.data.data as Appointment[];
    } catch (err) {
      const error = err as AxiosErrorResponse;
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch appointments"
      );
    }
  }
);

export const createAppointment = createAsyncThunk(
  "appointments/create",
  async (appointmentData: Omit<Appointment, "_id">, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/appointments",
        appointmentData
      );
      return response.data.data as Appointment;
    } catch (err) {
      const error = err as AxiosErrorResponse;
      return rejectWithValue(
        error.response?.data?.message || "Failed to create appointment"
      );
    }
  }
);

export const updateAppointment = createAsyncThunk(
  "appointments/update",
  async (
    { id, updates }: { id: string; updates: Partial<Appointment> },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.patch(
        `/appointments/${id}`,
        updates
      );
      return response.data.data as Appointment;
    } catch (err) {
      const error = err as AxiosErrorResponse;
      return rejectWithValue(
        error.response?.data?.message || "Failed to update appointment"
      );
    }
  }
);

export const deleteAppointment = createAsyncThunk(
  "appointments/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/appointments/${id}`);
      return id;
    } catch (err) {
      const error = err as AxiosErrorResponse;
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete appointment"
      );
    }
  }
);
