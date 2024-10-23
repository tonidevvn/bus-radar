import axios, { AxiosResponse } from "axios"
import { Route } from "../types/routes";

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

export {
  GET_ROUTES
}