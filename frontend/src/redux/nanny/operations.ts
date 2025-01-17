import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../hooks/axiosConfig";
import { NanniesListResponse } from "../../types";
import { FilterState } from "../../redux/filter/slice"; //

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
