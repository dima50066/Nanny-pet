import { RootState } from "../../redux/store";

export const selectNannies = (state: RootState) => state.nannies.items;
export const selectLoading = (state: RootState) => state.nannies.loading;
export const selectFavorites = (state: RootState) => state.nannies.favorites;
export const selectMyNannyProfile = (state: RootState) =>
  state.nannies.myNannyProfile;
export const selectCurrentPage = (state: RootState) =>
  state.nannies.currentPage;
export const selectTotalPages = (state: RootState) => state.nannies.totalPages;
