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
  fetchFilteredFavorites,
  createNannyProfile,
  fetchTotalNanniesCount,
  deleteNannyProfile,
} from "./operations";

interface NannyState {
  items: Nanny[];
  loading: boolean;
  error: string | null;
  currentNanny: Nanny | null;
  favorites: Nanny[];
  filteredFavorites: Nanny[];
  myNannyProfile: Nanny | null;
  currentPage: number;
  totalPages: number;
  favoritesCurrentPage: number;
  favoritesTotalPages: number;
  totalNanniesCount: number;
}

const initialState: NannyState = {
  items: [],
  loading: false,
  error: null,
  currentNanny: null,
  favorites: [],
  filteredFavorites: [],
  myNannyProfile: null,
  currentPage: 1,
  totalPages: 1,
  favoritesCurrentPage: 1,
  favoritesTotalPages: 1,
  totalNanniesCount: 0,
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
      .addCase(fetchFilteredFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilteredFavorites.fulfilled, (state, action) => {
        state.loading = false;
        if (action.meta.arg.page === 1) {
          state.filteredFavorites = action.payload.favorites;
        } else {
          state.filteredFavorites = [
            ...state.filteredFavorites,
            ...action.payload.favorites,
          ];
        }
        state.favoritesCurrentPage = action.payload.currentPage;
        state.favoritesTotalPages = action.payload.totalPages;
      })
      .addCase(fetchFilteredFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch filtered favorites";
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
      .addCase(fetchNannyById.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchMyNannyProfile.fulfilled, (state, action) => {
        state.myNannyProfile = action.payload;
      })
      .addCase(fetchMyNannyProfile.rejected, (state, action) => {
        state.error = action.payload || "Failed to fetch nanny profile";
        state.myNannyProfile = null;
      })

      .addCase(fetchNannyById.fulfilled, (state, action) => {
        state.currentNanny = action.payload;
      })
      .addCase(fetchNannyById.rejected, (state, action) => {
        state.error = action.payload || "Failed to fetch nanny by ID";
      })
      .addCase(createNannyProfile.pending, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(createNannyProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.myNannyProfile = action.payload;
      })
      .addCase(createNannyProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create nanny profile";
      })
      .addCase(updateNannyProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateNannyProfile.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateNannyProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update nanny profile";
      })
      .addCase(fetchTotalNanniesCount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTotalNanniesCount.fulfilled, (state, action) => {
        state.loading = false;
        state.totalNanniesCount = action.payload;
      })
      .addCase(fetchTotalNanniesCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch total nannies count";
      })
      .addCase(deleteNannyProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteNannyProfile.fulfilled, (state) => {
        state.loading = false;
        state.myNannyProfile = null;
      })
      .addCase(deleteNannyProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete nanny profile";
      });
  },
});

const persistConfig = {
  key: "nannies",
  storage,
  whitelist: ["favorites", "items"],
};

export default persistReducer(persistConfig, nanniesSlice.reducer);
