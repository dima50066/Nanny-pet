import { RootState } from "../../redux/store";

export const selectNannies = (state: RootState) => state.nannies.items;
export const selectLoading = (state: RootState) => state.nannies.loading;

export const selectHasFetched = (state: RootState) => state.nannies.hasFetched;

export const selectHasMore = (state: RootState) => state.nannies.hasMore;
