type Route = {
  routeID: number
  routeNumber: number
  routeCode: string
  routeName: string
  color: string
  headSign: string
  patternID: number
  patternCode: string
  patternName: string
  patternNumber: number
  directionID: number
  directionName: string
  serviceID?: number
  serviceName?: string
  arrivalTimes?: string
}

type Stop = {
  stopID: number
  stopNumber: number
  seq: number
  patternID: number
  stopCode: string
  stopName: string
  latitude: number
  longitude: number
  isPublic: boolean
  isActive: boolean
}

type VehicleStatus = {
  patternId: number
  name: string
  iconUrl: string
  vehicleCapacityIndicator: string
  isLight: boolean
  isMedium: boolean
  isFull: boolean
  headsignText: string
  vehicleId: number
  lastUpdate: string
  lat: number
  lng: number
  velocity: number
  bearing: number
  vehicleStateId: number
  bypassDailyTripId: number | null
}

type StopSchedule = {
  stopCode: string;
  failed: boolean | null;
  reqTime: Date;
  stopName: string | null;
  grpByPtrn: GroupByPattern[];
};

type GroupByPattern = {
  directId: number;
  directName: string | null;
  patternId: number;
  routeNum: number;
  routeName: string | null;
  routeCode: string;
  patternName: string | null;
  predictions: Prediction[];
  ptrnStart: Date;
};

type Prediction = {
  predictTime: Date;
  scheduleTime: Date;
  predictionType: string;
  seqNo: number;
};

type Timeline = {
  time: string;
  values: WeatherValue;
}

type WeatherValue = {
  cloudBase?: number;
  cloudCeiling?: number;
  cloudCover: number;
  dewPoint: number;
  evapotranspiration: number;
  freezingRainIntensity: number;
  humidity: number;
  iceAccumulation: number;
  iceAccumulationLwe: number;
  precipitationProbability: number;
  pressureSurfaceLevel: number;
  rainAccumulation: number;
  rainAccumulationLwe: number;
  rainIntensity: number;
  sleetAccumulation: number;
  sleetAccumulationLwe: number;
  sleetIntensity: number;
  snowAccumulation: number;
  snowAccumulationLwe: number;
  snowDepth: number;
  snowIntensity: number;
  temperature: number;
  temperatureApparent: number;
  uvHealthConcern: number;
  uvIndex: number;
  visibility: number;
  weatherCode: number;
  windDirection: number;
  windGust: number;
  windSpeed: number;
}


export type { Route, Stop, VehicleStatus, StopSchedule, Timeline }