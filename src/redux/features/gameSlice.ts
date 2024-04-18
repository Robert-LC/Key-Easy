import { createSlice } from '@reduxjs/toolkit'

import { generateInitialGameState } from '@/services/GameService'
import { GameState } from '@/contexts/GameContext'

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

      if (state.triesLeft === 1) {
        state.triesLeft = INTIAL_TRIES
        game.caseReducers.incrementNote(state)
      }
    },
    incrementScore: (state) => {
      state.score += 1
    },
    incrementScale: (state) => {
      state.currentScale = state.scales.pop()
      if (!state.currentScale) {
        state.isGameInProgress = false
      } else {
        game.caseReducers.incrementNote(state)
      }
    },
    incrementNote: (state) => {
      state.currentNote = state.notes.shift()
      if (!state.currentNote) {
        game.caseReducers.incrementScale(state)
      }

      state.triesLeft = INTIAL_TRIES
    }
  }
})

export const {
  toggleNoteNames,
  decrementTriesLeft,
  incrementScore,
  incrementScale,
  incrementNote
} = game.actions

export default game.reducer
