import { AxiosResponse } from "axios"
import { Route, Stop, StopSchedule, VehicleStatus } from "../types/type";
import instance from "./instance";



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

const GET_PREDICTIONS = async (stopId: number): Promise<StopSchedule> => {
  try {
    const response: AxiosResponse<StopSchedule> = await instance.get(`/api/predictionData`, {
      params: {
        stopId
      }
    });
    return response.data
  } catch (error) {
    console.error("Error fetching predictions: ", error);
    throw error;
  }
}

export {
  GET_ROUTES,
  GET_STOPS,
  GET_VEHICLE_STATUS,
  GET_PREDICTIONS
}