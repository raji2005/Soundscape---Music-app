import { configureStore } from '@reduxjs/toolkit'
import playerReducer from './playerSlice'
import uiReducer from './uiSlice'

export const store = configureStore({
  reducer: {
    player: playerReducer,
    ui: uiReducer,
  },
})