import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GET_WEATHER } from "../../api/weather_api";
import { Timeline } from "../../types/type";

// Define the type for the weather state
interface WeatherState {
  data: Record<string, Timeline[]>; // Keyed by `lat,lng,timeline`
  status: "idle" | "loading" | "succeeded" | "failed"; // Loading status
  error: string | null; // Error message, if any
}

// Initial state for the weather slice
const initialState: WeatherState = {
  data: {},
  status: "idle",
  error: null,
};

// Async thunk to fetch weather data
export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async ({
    lat,
    lng,
    timeline,
  }: {
    lat: number;
    lng: number;
    timeline: string;
  }) => {
    const data = await GET_WEATHER({ lat, lng, timeline });
    return { data, key: `${lat},${lng},${timeline}` }; // Include key in response
  }
);

// Weather slice
const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        const { data, key } = action.payload;
        state.data[key] = data;
        state.status = "succeeded";
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch weather data";
      });
  },
});

export default weatherSlice.reducer;
