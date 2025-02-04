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
      state.filters = { ...state.filters, ...action.payload };
      state.page = 1;
    },
  },
});

export const { setFilters } = filterSlice.actions;
export default filterSlice.reducer;
