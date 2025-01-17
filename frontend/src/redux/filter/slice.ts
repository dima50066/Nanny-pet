import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  filters: { sort: string };
  page: number;
}

const initialState: FilterState = {
  filters: { sort: "A to Z" },
  page: 1,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<{ sort: string }>) {
      state.filters = action.payload;
      state.page = 1;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
});

export const { setFilters, setPage } = filterSlice.actions;
export default filterSlice.reducer;
