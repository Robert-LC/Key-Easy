import { configureStore } from '@reduxjs/toolkit'

import { generateInitialGameState } from '@/services/GameService'

import gameReducer from './features/gameSlice'

const preloadedState = {
  game: generateInitialGameState()
}

export const store = configureStore({
  reducer: {
    game: gameReducer
  },
  preloadedState
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
