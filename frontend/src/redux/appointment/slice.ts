import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from "./operations";
import { Appointment } from "../../types";

interface AppointmentState {
  appointments: Appointment[];
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: AppointmentState = {
  appointments: [],
  isLoading: false,
  error: null,
  successMessage: null,
};

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        createAppointment.fulfilled,
        (state, action: PayloadAction<Appointment>) => {
          state.appointments.push(action.payload);
          state.isLoading = false;
          state.successMessage = "Appointment created successfully!";
        }
      )
      .addCase(createAppointment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createAppointment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(
        updateAppointment.fulfilled,
        (state, action: PayloadAction<Appointment>) => {
          const index = state.appointments.findIndex(
            (a) => a._id === action.payload._id
          );
          if (index !== -1) state.appointments[index] = action.payload;
          state.isLoading = false;
          state.successMessage = "Appointment updated successfully!";
        }
      )
      .addCase(updateAppointment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateAppointment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(
        deleteAppointment.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.appointments = state.appointments.filter(
            (a) => a._id !== action.payload
          );
          state.isLoading = false;
          state.successMessage = "Appointment deleted successfully!";
        }
      )
      .addCase(deleteAppointment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteAppointment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearMessages } = appointmentSlice.actions;
export default appointmentSlice.reducer;
