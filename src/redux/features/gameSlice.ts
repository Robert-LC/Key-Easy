import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { generateInitialGameState } from '@/services/GameService'
import { GameState } from '@/types/GameState'

const INTIAL_TRIES = 3
const initialState: GameState = generateInitialGameState()

export const game = createSlice({
  name: 'game',
  initialState,
  reducers: {
    toggleNoteNames: (state) => {
      state.showNoteNames = !state.showNoteNames
    },
    decrementTriesLeft: (state) => {
      state.triesLeft -= 1
    },
    incrementScore: (state) => {
      state.score += 1
    },
    incrementScale: (state) => {
      state.currentScale = state.scales.pop()
    },
    incrementNote: (state) => {
      state.currentNote = state.notes.shift()
    },
    resetTriesLeft: (state) => {
      state.triesLeft = INTIAL_TRIES
    },
    setGameInProgress: (state, action: PayloadAction<boolean>) => {
      state.isGameInProgress = action.payload
    }
  }
})

export const {
  decrementTriesLeft,
  incrementNote,
  incrementScale,
  incrementScore,
  resetTriesLeft,
  setGameInProgress,
  toggleNoteNames
} = game.actions

export default game.reducer
