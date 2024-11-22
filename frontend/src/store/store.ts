import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./slices/appSlice";
import busReducer from "./slices/busSlice";
import weatherReducer from "./slices/weatherSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    bus: busReducer,
    weather: weatherReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
