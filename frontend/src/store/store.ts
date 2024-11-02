import { configureStore } from '@reduxjs/toolkit'
import busReducer from './slices/busSlice'

export const store = configureStore({
  reducer: {
    bus: busReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch