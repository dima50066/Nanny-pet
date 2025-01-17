import { createSlice } from "@reduxjs/toolkit";
import { Nanny } from "../../types";
import {
  fetchFilteredNannies,
  addToFavorites,
  removeFromFavorites,
  fetchFavorites,
  updateNannyProfile,
  fetchMyNannyProfile,
  fetchNannyById,
} from "./operations";

interface NannyState {
  items: Nanny[];
  loading: boolean;
  error: string | null;
  page: number;
  hasFetched: boolean;
  hasMore: boolean;
  currentNanny: Nanny | null;
  favorites: Nanny[];
  myNannyProfile: Nanny | null;
}

const initialState: NannyState = {
  items: [],
  loading: false,
  error: null,
  page: 0,
  hasFetched: false,
  hasMore: true,
  currentNanny: null,
  favorites: [],
  myNannyProfile: null,
};

const nanniesSlice = createSlice({
  name: "nannies",
  initialState,
  reducers: {
    resetHasFetched(state) {
      state.hasFetched = false;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setHasMore(state, action) {
      state.hasMore = action.payload;
    },
    resetPage(state) {
      state.page = 1;
      state.hasMore = true;
      state.items = [];
    },
    resetItems(state) {
      state.items = [];
    },
    resetFavorites(state) {
      state.favorites = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilteredNannies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFilteredNannies.fulfilled, (state, action) => {
        if (state.page === 1) {
          state.items = action.payload.nannies;
        } else {
          state.items.push(...action.payload.nannies);
        }

        if (action.payload.nannies.length < 3) {
          state.hasMore = false;
        }

        state.loading = false;
        state.hasFetched = true;
      })
      .addCase(fetchFilteredNannies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch nannies";
        state.hasFetched = true;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(addToFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(fetchMyNannyProfile.fulfilled, (state, action) => {
        state.myNannyProfile = action.payload;
      })
      .addCase(updateNannyProfile.fulfilled, (state, action) => {
        state.myNannyProfile = action.payload;
      })
      .addCase(fetchNannyById.fulfilled, (state, action) => {
        state.currentNanny = action.payload;
      })
      .addCase(fetchNannyById.rejected, (state, action) => {
        state.error = action.payload || "Failed to fetch nanny by ID";
      });
  },
});

export const {
  resetHasFetched,
  resetFavorites,
  resetItems,
  setPage,
  setHasMore,
  resetPage,
} = nanniesSlice.actions;
export default nanniesSlice.reducer;
