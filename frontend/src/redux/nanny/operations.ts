import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../hooks/axiosConfig";
import {
  Nanny,
  NannyResponse,
  NanniesListResponse,
  FavoritesResponse,
  AxiosErrorResponse,
  QueryParams,
} from "../../types";

export const createNanny = createAsyncThunk(
  "nanny/create",
  async (nannyData: Partial<Nanny>, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<NannyResponse>(
        "/nanny",
        nannyData
      );
      return response.data.data;
    } catch (error) {
      const err = error as AxiosErrorResponse;
      return rejectWithValue(
        err.response?.data.message || "Failed to create nanny profile"
      );
    }
  }
);

export const getMyNannyProfile = createAsyncThunk(
  "nanny/getMyProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<NannyResponse>("/nanny/me");
      return response.data.data;
    } catch (error) {
      const err = error as AxiosErrorResponse;
      return rejectWithValue(
        err.response?.data.message || "Failed to fetch nanny profile"
      );
    }
  }
);

export const updateNannyProfile = createAsyncThunk(
  "nanny/update",
  async (updates: Partial<Nanny>, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch<NannyResponse>(
        "/nanny",
        updates
      );
      return response.data.data;
    } catch (error) {
      const err = error as AxiosErrorResponse;
      return rejectWithValue(
        err.response?.data.message || "Failed to update nanny profile"
      );
    }
  }
);

export const deleteNannyProfile = createAsyncThunk(
  "nanny/delete",
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.delete("/nanny");
      return "Nanny profile deleted successfully";
    } catch (error) {
      const err = error as AxiosErrorResponse;
      return rejectWithValue(
        err.response?.data.message || "Failed to delete nanny profile"
      );
    }
  }
);

export const fetchNannies = createAsyncThunk(
  "nanny/fetchAll",
  async (queryParams: QueryParams, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<NanniesListResponse>("/nanny", {
        params: queryParams,
      });
      return response.data.data;
    } catch (error) {
      const err = error as AxiosErrorResponse;
      return rejectWithValue(
        err.response?.data.message || "Failed to fetch nannies"
      );
    }
  }
);

export const addToFavorites = createAsyncThunk(
  "nanny/addToFavorites",
  async (nannyId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<FavoritesResponse>(
        "/nanny/favorites",
        {
          nannyId,
        }
      );
      return response.data.data;
    } catch (error) {
      const err = error as AxiosErrorResponse;
      return rejectWithValue(
        err.response?.data.message || "Failed to add nanny to favorites"
      );
    }
  }
);

export const removeFromFavorites = createAsyncThunk(
  "nanny/removeFromFavorites",
  async (nannyId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete<FavoritesResponse>(
        "/nannies/favorites",
        {
          data: { nannyId },
        }
      );
      return response.data.data;
    } catch (error) {
      const err = error as AxiosErrorResponse;
      return rejectWithValue(
        err.response?.data.message || "Failed to remove nanny from favorites"
      );
    }
  }
);

export const fetchFavorites = createAsyncThunk(
  "nanny/fetchFavorites",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<FavoritesResponse>(
        "/nanny/favorites"
      );
      return response.data.data;
    } catch (error) {
      const err = error as AxiosErrorResponse;
      return rejectWithValue(
        err.response?.data.message || "Failed to fetch favorites"
      );
    }
  }
);

export const fetchNannyById = createAsyncThunk(
  "nanny/fetchById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<NannyResponse>(`/nanny/${id}`);
      return response.data.data;
    } catch (error) {
      const err = error as AxiosErrorResponse;
      return rejectWithValue(
        err.response?.data.message || "Failed to fetch nanny by ID"
      );
    }
  }
);
