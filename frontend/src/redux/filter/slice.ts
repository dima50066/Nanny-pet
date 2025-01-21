import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FilterState {
  filters: {
    sortBy: string;
    order: string;
    priceRange?: string;
    rating?: number;
  };
  page: number;
}

const initialState: FilterState = {
  filters: { sortBy: "name", order: "asc" },
  page: 1,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<Partial<FilterState["filters"]>>) {
      state.filters = action.payload as FilterState["filters"];
      state.page = 1;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
});

export const { setFilters, setPage } = filterSlice.actions;
export default filterSlice.reducer;
