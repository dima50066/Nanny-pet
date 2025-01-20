import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance, {
  setAuthHeader,
  clearAuthHeader,
} from "../../hooks/axiosConfig";
import {
  User,
  LoginResponse,
  AxiosErrorResponse,
  ResetResponse,
} from "../../types";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    userData: { email: string; password: string; name: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post<{ user: User }>(
        "/auth/register",
        userData
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosErrorResponse;
      return rejectWithValue(
        err.response?.data.message || "Registration failed"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    userData: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post<LoginResponse>(
        "/auth/login",
        userData
      );
      const { accessToken, user } = response.data.data;

      setAuthHeader(accessToken);
      return { user, token: accessToken };
    } catch (error) {
      const err = error as AxiosErrorResponse;
      return rejectWithValue(err.response?.data.message || "Login failed");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.post("/auth/logout");
      clearAuthHeader();
    } catch (error) {
      const err = error as AxiosErrorResponse;
      return rejectWithValue(err.response?.data.message || "Logout failed");
    }
  }
);

export const refreshSession = createAsyncThunk(
  "auth/refreshSession",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<LoginResponse>("/auth/refresh");
      const { accessToken } = response.data.data;

      setAuthHeader(accessToken);

      return accessToken;
    } catch (error) {
      const err = error as AxiosErrorResponse;
      return rejectWithValue(
        err.response?.data.message || "Session refresh failed"
      );
    }
  }
);

export const requestPasswordReset = createAsyncThunk(
  "auth/requestReset",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<ResetResponse>(
        "/auth/send-reset-email",
        { email }
      );
      return response.data.message;
    } catch (error) {
      const err = error as AxiosErrorResponse;
      return rejectWithValue(
        err.response?.data.message || "Password reset request failed"
      );
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (
    payload: { token: string; newPassword: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post<ResetResponse>(
        "/auth/reset-pwd",
        payload
      );
      return response.data.message;
    } catch (error) {
      const err = error as AxiosErrorResponse;
      return rejectWithValue(
        err.response?.data.message || "Password reset failed"
      );
    }
  }
);
