import { AxiosResponse } from "axios";
import { Timeline } from "../types/type";
import instance from "./instance";


const GET_WEATHER = async ({
  lat,
  lng,
  timeline
}: {
  lat: number;
  lng: number;
  timeline: string;
}): Promise<Timeline[]> => {
  try {
    const response: AxiosResponse<Timeline[]> = await instance.get("/api/weather",
      {
        params: {
          lat,
          lng,
          timeline
        }
      });
    return response.data
  } catch (error) {
    console.error("Error fetching routes: ", error);
    throw error;
  }
}


export {
  GET_WEATHER
}