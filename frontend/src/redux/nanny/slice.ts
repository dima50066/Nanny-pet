import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createNanny,
  getMyNannyProfile,
  updateNannyProfile,
  deleteNannyProfile,
  fetchNannies,
  addToFavorites,
  removeFromFavorites,
  fetchFavorites,
  fetchNannyById,
} from "./operations";
import { Nanny } from "../../types";

interface NannyState {
  nannies: Nanny[];
  myProfile: Nanny | null;
  favorites: Nanny[];
  details: Nanny | null;
  totalPages: number;
  currentPage: number;
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: NannyState = {
  nannies: [],
  myProfile: null,
  favorites: [],
  details: null,
  totalPages: 0,
  currentPage: 1,
  isLoading: false,
  error: null,
  successMessage: null,
};

const nannySlice = createSlice({
  name: "nanny",
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNanny.fulfilled, (state, action: PayloadAction<Nanny>) => {
        state.myProfile = action.payload;
        state.isLoading = false;
        state.successMessage = "Nanny profile created successfully!";
      })
      .addCase(createNanny.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createNanny.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(
        getMyNannyProfile.fulfilled,
        (state, action: PayloadAction<Nanny>) => {
          state.myProfile = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(getMyNannyProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMyNannyProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(
        updateNannyProfile.fulfilled,
        (state, action: PayloadAction<Nanny>) => {
          state.myProfile = action.payload;
          state.isLoading = false;
          state.successMessage = "Nanny profile updated successfully!";
        }
      )
      .addCase(updateNannyProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateNannyProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(deleteNannyProfile.fulfilled, (state) => {
        state.myProfile = null;
        state.isLoading = false;
        state.successMessage = "Nanny profile deleted successfully!";
      })
      .addCase(deleteNannyProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteNannyProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(
        fetchNannies.fulfilled,
        (
          state,
          action: PayloadAction<{
            nannies: Nanny[];
            totalPages: number;
            currentPage: number;
          }>
        ) => {
          state.nannies = action.payload.nannies;
          state.totalPages = action.payload.totalPages;
          state.currentPage = action.payload.currentPage;
          state.isLoading = false;
        }
      )
      .addCase(fetchNannies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNannies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(
        addToFavorites.fulfilled,
        (state, action: PayloadAction<Nanny[]>) => {
          state.favorites = action.payload;
          state.isLoading = false;
          state.successMessage = "Nanny added to favorites successfully!";
        }
      )
      .addCase(addToFavorites.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(
        removeFromFavorites.fulfilled,
        (state, action: PayloadAction<Nanny[]>) => {
          state.favorites = action.payload;
          state.isLoading = false;
          state.successMessage = "Nanny removed from favorites successfully!";
        }
      )
      .addCase(removeFromFavorites.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeFromFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(
        fetchFavorites.fulfilled,
        (state, action: PayloadAction<Nanny[]>) => {
          state.favorites = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(fetchFavorites.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(
        fetchNannyById.fulfilled,
        (state, action: PayloadAction<Nanny>) => {
          state.details = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(fetchNannyById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNannyById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearMessages } = nannySlice.actions;
export default nannySlice.reducer;
