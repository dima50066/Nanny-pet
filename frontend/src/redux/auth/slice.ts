import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshSession,
  requestPasswordReset,
  resetPassword,
} from "./operations";
import { User } from "../../types";
import persistReducer from "redux-persist/lib/persistReducer";
import storage from "redux-persist/lib/storage";

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
  isAuthenticated: boolean;
  isRefreshing: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
  successMessage: null,
  isAuthenticated: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<{ user: User }>) => {
          state.isLoading = false;
          state.user = action.payload.user;
          state.isAuthenticated = true;
        }
      )
      .addCase(
        registerUser.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.isLoading = false;
          state.error = (action.payload as string) || "Registration failed";
        }
      )

      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<{ user: User; token: string }>) => {
          state.isLoading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isAuthenticated = true;
        }
      )
      .addCase(loginUser.rejected, (state, action: PayloadAction<unknown>) => {
        state.isLoading = false;
        state.error = (action.payload as string) || "Login failed";
      })

      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action: PayloadAction<unknown>) => {
        state.isLoading = false;
        state.error = (action.payload as string) || "Logout failed";
      })

      // Refresh Session
      .addCase(refreshSession.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(
        refreshSession.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.token = action.payload;
          state.isAuthenticated = true;
          state.isRefreshing = false;
        }
      )
      .addCase(
        refreshSession.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.isLoading = false;
          state.isRefreshing = false;
          state.error = (action.payload as string) || "Session refresh failed";
        }
      )

      // Request Password Reset
      .addCase(requestPasswordReset.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        requestPasswordReset.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.successMessage = action.payload;
        }
      )
      .addCase(
        requestPasswordReset.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.isLoading = false;
          state.error =
            (action.payload as string) || "Password reset request failed";
        }
      )

      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        resetPassword.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.successMessage = action.payload;
        }
      )
      .addCase(
        resetPassword.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.isLoading = false;
          state.error = (action.payload as string) || "Password reset failed";
        }
      );
  },
});

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "isAuthenticated", "user"],
};

export default persistReducer(persistConfig, authSlice.reducer);
