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

export const fetchFilteredFavorites = createAsyncThunk<
  NanniesListResponse["data"],
  { page: number; filters: FilterState["filters"] },
  { rejectValue: string }
>(
  "favorites/fetchFilteredFavorites",
  async ({ page, filters }, { rejectWithValue }) => {
    try {
      const params = {
        page,
        sortBy: filters.sortBy,
        order: filters.order,
        ...(filters.priceRange && { priceRange: filters.priceRange }),
        ...(filters.rating && { rating: filters.rating }),
      };

      const response = await axiosInstance.get(`nanny/favorites/filter`, {
        params,
      });
      return response.data.data;
    } catch {
      return rejectWithValue("Failed to fetch filtered favorites");
    }
  }
);

export const createNannyProfile = createAsyncThunk<
  Nanny,
  { data: Partial<Nanny>; file?: File },
  { rejectValue: string }
>("nannies/createNannyProfile", async ({ data, file }, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      const value = data[key as keyof Nanny];
      if (value !== undefined) formData.append(key, value as string | Blob);
    });
    if (file) formData.append("avatar", file);

    const response = await axiosInstance.post(`/nanny`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.data;
  } catch {
    return rejectWithValue("Failed to create nanny profile");
  }
});

export const updateNannyProfile = createAsyncThunk<
  Nanny,
  { data: Partial<Nanny>; file?: File },
  { rejectValue: string }
>("nannies/updateNannyProfile", async ({ data, file }, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      const value = data[key as keyof Nanny];
      if (value !== undefined) formData.append(key, value as string | Blob);
    });
    if (file) formData.append("avatar", file);

    const response = await axiosInstance.patch(`/nanny`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.data;
  } catch {
    return rejectWithValue("Failed to update nanny profile");
  }
});
