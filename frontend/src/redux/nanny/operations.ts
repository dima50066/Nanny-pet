import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../hooks/axiosConfig";
import { NanniesListResponse, Nanny } from "../../types";
import { FilterState } from "../../redux/filter/slice";

export const fetchFilteredNannies = createAsyncThunk<
  NanniesListResponse["data"],
  { page: number; filters: FilterState["filters"] },
  { rejectValue: string }
>(
  "nannies/fetchFilteredNannies",
  async ({ page, filters }, { rejectWithValue }) => {
    try {
      const params = {
        page,
        sortBy: filters.sortBy,
        order: filters.order,
        ...(filters.priceRange && { priceRange: filters.priceRange }),
        ...(filters.rating && { rating: filters.rating }),
      };

      const response = await axiosInstance.get(`/nanny`, { params });
      return response.data.data;
    } catch {
      return rejectWithValue("Unexpected error occurred");
    }
  }
);

export const fetchNannyById = createAsyncThunk<
  Nanny,
  { id: string },
  { rejectValue: string }
>("nannies/fetchNannyById", async ({ id }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`/nanny/${id}`);
    return response.data.data;
  } catch {
    return rejectWithValue("Failed to fetch nanny by ID");
  }
});

export const fetchFavorites = createAsyncThunk<
  Nanny[],
  void,
  { rejectValue: string }
>("nannies/fetchFavorites", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get("/nanny/favorites");
    return response.data.data;
  } catch {
    return rejectWithValue("Failed to fetch favorites");
  }
});

export const addToFavorites = createAsyncThunk<
  Nanny[],
  { nannyId: string },
  { rejectValue: string }
>("nannies/addToFavorites", async ({ nannyId }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("/nanny/favorites", { nannyId });
    return response.data.data;
  } catch {
    return rejectWithValue("Failed to add to favorites");
  }
});

export const removeFromFavorites = createAsyncThunk<
  Nanny[],
  { nannyId: string },
  { rejectValue: string }
>("nannies/removeFromFavorites", async ({ nannyId }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.delete("/nanny/favorites", {
      data: { nannyId },
    });
    return response.data.data;
  } catch {
    return rejectWithValue("Failed to remove from favorites");
  }
});

export const updateNannyProfile = createAsyncThunk<
  Nanny,
  Partial<Nanny>,
  { rejectValue: string }
>("nannies/updateNannyProfile", async (updates, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.patch("/nanny", updates);
    return response.data.data;
  } catch {
    return rejectWithValue("Failed to update nanny profile");
  }
});

export const fetchMyNannyProfile = createAsyncThunk<
  Nanny,
  void,
  { rejectValue: string }
>("nannies/fetchMyNannyProfile", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get("/nanny/me");
    return response.data.data;
  } catch {
    return rejectWithValue("Failed to fetch nanny profile");
  }
});
