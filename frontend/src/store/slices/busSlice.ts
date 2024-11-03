import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Stop } from '../../types/type'

interface BusState {
  routeID: number
  pickStop: Stop | null
  patternIDs: string
}

const initialState: BusState = {
  routeID: 0,
  pickStop: null,
  patternIDs: ''
}

const busSlice = createSlice({
  name: 'bus',
  initialState,
  reducers: {
    setRouteID: (state, action: PayloadAction<number>) => {
      state.routeID = action.payload
    },
    setPickStop: (state, action: PayloadAction<Stop | null>) => {
      state.pickStop = action.payload
    },
    setPatternIDs: (state, action: PayloadAction<string>) => {
      state.patternIDs = action.payload
    }
  }
})

export const { setRouteID, setPatternIDs, setPickStop } = busSlice.actions

export default busSlice.reducer