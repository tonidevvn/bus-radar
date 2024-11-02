import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface BusState {
  patternIDs: string
}

const initialState: BusState = {
  patternIDs: ''
}

const busSlice = createSlice({
  name: 'bus',
  initialState,
  reducers: {
    setPatternIDs: (state, action: PayloadAction<string>) => {
      state.patternIDs = action.payload
    }
  }
})

export const { setPatternIDs } = busSlice.actions

export default busSlice.reducer