import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import authReducer from "./auth/slice";
import nannyReducer from "./nanny/slice";
import filtersReducer from "./filter/slice";
import appointmentReducer from "./appointment/slice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "nannies", "filters", "appointments"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  nannies: nannyReducer,
  filters: filtersReducer,
  appointments: appointmentReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
