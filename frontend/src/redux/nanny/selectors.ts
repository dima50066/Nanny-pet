import { RootState } from "../store";

export const selectNannies = (state: RootState) => state.nanny.nannies;
export const selectMyNannyProfile = (state: RootState) => state.nanny.myProfile;
export const selectFavorites = (state: RootState) => state.nanny.favorites;
export const selectNannyDetails = (state: RootState) => state.nanny.details;
export const selectNannyLoading = (state: RootState) => state.nanny.isLoading;
export const selectNannyError = (state: RootState) => state.nanny.error;
