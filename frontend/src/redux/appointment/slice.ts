import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from "./operations";

interface Appointment {
  _id: string;
  nannyId: string;
  date: string;
  address: string;
  phone: string;
  childAge: number;
  email: string;
  parentName: string;
  meetingTime: string;
  comment: string;
}

interface AppointmentsState {
  items: Appointment[];
  isLoading: boolean;
  error: string | null;
}

const initialState: AppointmentsState = {
  items: [],
  isLoading: false,
  error: null,
};

const appointmentsSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchAppointments.fulfilled,
        (state, action: PayloadAction<Appointment[]>) => {
          state.isLoading = false;
          state.items = action.payload;
        }
      )
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch appointments";
      })
      .addCase(createAppointment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        createAppointment.fulfilled,
        (state, action: PayloadAction<Appointment>) => {
          state.isLoading = false;
          state.items.push(action.payload);
        }
      )
      .addCase(createAppointment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to create appointment";
      })
      .addCase(updateAppointment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        updateAppointment.fulfilled,
        (state, action: PayloadAction<Appointment>) => {
          state.isLoading = false;
          const index = state.items.findIndex(
            (item) => item._id === action.payload._id
          );
          if (index !== -1) {
            state.items[index] = action.payload;
          }
        }
      )
      .addCase(updateAppointment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to update appointment";
      })
      .addCase(deleteAppointment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        deleteAppointment.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.items = state.items.filter(
            (item) => item._id !== action.payload
          );
        }
      )
      .addCase(deleteAppointment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to delete appointment";
      });
  },
});

export default appointmentsSlice.reducer;
