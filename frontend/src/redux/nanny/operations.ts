import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../hooks/axiosConfig";
import { NanniesListResponse } from "../../types";

// Fetch Nannies
export const fetchFilteredNannies = createAsyncThunk<
  NanniesListResponse["data"],
  { page: number },
  { rejectValue: string }
>("nannies/fetchFilteredNannies", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`/nanny`);
    return response.data.data;
  } catch {
    return rejectWithValue("Unexpected error occurred");
  }
});
