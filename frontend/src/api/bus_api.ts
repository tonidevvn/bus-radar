import axios, { AxiosResponse } from "axios"
import { Route, Stop, VehicleStatus } from "../types/type";

const backend = "http://localhost:8080";

// Create an Axios instance with base URL
const instance = axios.create({
  baseURL: backend,
  timeout: 5000, // optional: timeout for requests
  headers: {
    "Content-Type": "application/json",
  },
});

const GET_ROUTES = async (): Promise<Route[]> => {
  try {
    const response: AxiosResponse<Route[]> = await instance.get("/api/routes");
    return response.data
  } catch (error) {
    console.error("Error fetching routes: ", error);
    throw error;
  }
}

const GET_STOPS = async (patternIds: string): Promise<Stop[]> => {
  try {
    const response: AxiosResponse<Stop[]> = await instance.get("/api/stops", {
      params: {
        patternIds
      }
    });
    return response.data
  } catch (error) {
    console.error("Error fetching stops: ", error);
    throw error;
  }
}

const GET_VEHICLE_STATUS = async (patternIds: string): Promise<VehicleStatus[]> => {
  try {
    const response: AxiosResponse<VehicleStatus[]> = await instance.get("/api/vehicleStatus", { params: { patternIds: patternIds } });
    return response.data
  } catch (error) {
    console.error("Error fetching vehicle status: ", error);
    throw error;
  }
}

export {
  GET_ROUTES,
  GET_STOPS,
  GET_VEHICLE_STATUS
}