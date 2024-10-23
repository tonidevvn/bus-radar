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

export type { Route, Stop, VehicleStatus }