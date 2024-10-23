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

export type { Route }