import { createSlice } from "@reduxjs/toolkit";
import { fetchFilteredNannies } from "./operations";
import { Nanny } from "../../types";

interface NannyState {
  items: Nanny[];
  loading: boolean;
  error: string | null;
  hasFetched: boolean;
}

const initialState: NannyState = {
  items: [],
  loading: false,
  error: null,
  hasFetched: false,
};

const nanniesSlice = createSlice({
  name: "nannies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilteredNannies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFilteredNannies.fulfilled, (state, action) => {
        state.items = action.payload.nannies;
        state.loading = false;
        state.hasFetched = true;
      })
      .addCase(fetchFilteredNannies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch nannies";
        state.hasFetched = true;
      });
  },
});

export default nanniesSlice.reducer;
