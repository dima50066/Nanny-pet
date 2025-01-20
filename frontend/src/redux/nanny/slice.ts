import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
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
  currentNanny: Nanny | null;
  favorites: Nanny[];
  myNannyProfile: Nanny | null;
  currentPage: number;
  totalPages: number;
}

const initialState: NannyState = {
  items: [],
  loading: false,
  error: null,
  currentNanny: null,
  favorites: [],
  myNannyProfile: null,
  currentPage: 1,
  totalPages: 1,
};

const nanniesSlice = createSlice({
  name: "nannies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilteredNannies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilteredNannies.fulfilled, (state, action) => {
        state.loading = false;
        if (action.meta.arg.page === 1) {
          state.items = action.payload.nannies;
        } else {
          state.items = [...state.items, ...action.payload.nannies];
        }
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchFilteredNannies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch nannies";
      })
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.loading = false;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch favorites";
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

const persistConfig = {
  key: "nannies",
  storage,
  whitelist: ["favorites", "items"],
};

export default persistReducer(persistConfig, nanniesSlice.reducer);
