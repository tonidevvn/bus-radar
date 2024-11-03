import { AxiosResponse } from "axios";
import { Route, RouteBuilder, Stop, StopSchedule, VehicleStatus } from "../types/type";
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

const GET_ROUTES_BUILDER = async (patternIds: string): Promise<RouteBuilder[]> => {
  try {
    const response: AxiosResponse<RouteBuilder[]> = await instance.get("/api/routesBuilder", {
      params: {
        patternIds
      }
    });
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

const GET_STOP_TIMES = async (stopID: number): Promise<StopSchedule> => {
  try {
    const response: AxiosResponse<StopSchedule> = await instance.get("/api/stopTimes", {
      params: {
        stopID
      }
    });
    return response.data
  } catch (error) {
    console.error("Error fetching stop times: ", error);
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
  GET_PREDICTIONS,
  GET_ROUTES,
  GET_ROUTES_BUILDER,
  GET_STOP_TIMES,
  GET_STOPS,
  GET_VEHICLE_STATUS
};

