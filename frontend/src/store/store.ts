import { configureStore } from "@reduxjs/toolkit";
import busReducer from "./slices/busSlice";
import weatherReducer from "./slices/weatherSlice";

export const store = configureStore({
  reducer: {
    bus: busReducer,
    weather: weatherReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
