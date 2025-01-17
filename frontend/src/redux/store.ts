import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authReducer from "./auth/slice";
import nannyReducer from "./nanny/slice";
import appointmentReducer from "./appointment/slice";
import filtersReducer from "./filter/slice";

export const store = configureStore({
  reducer: {
    nannies: nannyReducer,
    auth: authReducer,
    appointment: appointmentReducer,
    filters: filtersReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
