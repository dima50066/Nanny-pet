import { createSlice } from "@reduxjs/toolkit";
import { fetchFilteredNannies } from "./operations";
import { Nanny } from "../../types";

interface NannyState {
  items: Nanny[];
  loading: boolean;
  error: string | null;
  hasFetched: boolean;
  page: number;
  hasMore: boolean;
}

const initialState: NannyState = {
  items: [],
  loading: false,
  error: null,
  hasFetched: false,
  page: 0,
  hasMore: true,
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
      state.items = []; // Очищаємо список при скиданні сторінки
    },
    resetItems(state) {
      state.items = []; // Очищаємо список при зміні фільтрів
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilteredNannies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFilteredNannies.fulfilled, (state, action) => {
        // Якщо це нові фільтри, заміщаємо старі результати
        if (state.page === 1) {
          state.items = action.payload.nannies;
        } else {
          state.items.push(...action.payload.nannies);
        }

        // Оновлюємо стан hasMore
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
      });
  },
});

export const { resetHasFetched, setPage, resetPage, setHasMore, resetItems } =
  nanniesSlice.actions;
export default nanniesSlice.reducer;
