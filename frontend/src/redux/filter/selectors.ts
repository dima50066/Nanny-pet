import { RootState } from "../../redux/store";

export const selectFilters = (state: RootState) => state.filters.filters;
export const selectPage = (state: RootState) => state.filters.page;
