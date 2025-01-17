import { RootState } from "../store";

export const selectUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectSuccessMessage = (state: RootState) =>
  state.auth.successMessage;
export const selectIsLoggedIn = (state: RootState) =>
  state.auth.isAuthenticated && !!state.auth.token;
export const selectIsTokenRefreshing = (state: RootState) =>
  state.auth.isTokenRefreshing;
