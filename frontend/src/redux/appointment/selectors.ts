import { RootState } from "../store";

export const selectAppointments = (state: RootState) =>
  state.appointment.appointments;
export const selectIsLoading = (state: RootState) =>
  state.appointment.isLoading;
export const selectAppointmentError = (state: RootState) =>
  state.appointment.error;
export const selectSuccessMessage = (state: RootState) =>
  state.appointment.successMessage;
