import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Stop, StopDelay } from '../../types/type'

interface BusState {
  routeID: number
  availableStops: Stop[]
  pickStop: Stop | null
  patternIDs: string
  stopDelays: StopDelay[]
}

const initialState: BusState = {
  routeID: 0,
  availableStops: [],
  pickStop: null,
  patternIDs: '',
  stopDelays: []
}

const busSlice = createSlice({
  name: 'bus',
  initialState,
  reducers: {
    setRouteID: (state, action: PayloadAction<number>) => {
      state.routeID = action.payload
    },
    setAvailableStops: (state, action: PayloadAction<Stop[]>) => {
      state.availableStops = action.payload
    },
    setPickStop: (state, action: PayloadAction<Stop | null>) => {
      state.pickStop = action.payload
    },
    setPatternIDs: (state, action: PayloadAction<string>) => {
      state.patternIDs = action.payload
    },
    setStopDelays: (state, action: PayloadAction<StopDelay[]>) => {
      state.stopDelays = action.payload
    }
  }
})

export const { setRouteID, setPatternIDs, setPickStop, setAvailableStops, setStopDelays } = busSlice.actions

export default busSlice.reducer