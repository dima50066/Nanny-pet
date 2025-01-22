import { RootState } from "../store";

export const selectAppointments = (state: RootState) =>
  state.appointments.items;
export const selectIsLoading = (state: RootState) =>
  state.appointments.isLoading;
export const selectError = (state: RootState) => state.appointments.error;
