import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authReducer from "./auth/slice";
import nannyReducer from "./nanny/slice";
import appointmentReducer from "./appointment/slice";

export const store = configureStore({
  reducer: {
    nanny: nannyReducer,
    auth: authReducer,
    appointment: appointmentReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
