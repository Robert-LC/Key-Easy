import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { GameState } from '@/types/GameState'
import { ScaleMode } from '@/types/Types'

const INTIAL_TRIES = 3

export const initialState: GameState = {
  notes: [],
  scales: [],
  currentNote: undefined,
  currentScale: undefined,
  isGameInProgress: true,
  mode: ScaleMode.Major,
  score: 0,
  showNoteNames: true,
  triesLeft: INTIAL_TRIES,
  noteStatuses: {}
}

const gameSlice = createSlice({
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
    incrementNote: (state) => {
      gameSlice.caseReducers.resetTriesLeft(state)

      if (state.notes.length > 0) {
        state.currentNote = state.notes.shift()
        return
      }

      // if there are no remaining notes, check for remaining scales
      if (state.scales.length > 0) {
        state.currentScale = state.scales.pop()

        state.notes = state.currentScale!.notes
        state.currentNote = state.notes.shift()

        gameSlice.caseReducers.clearNoteStatuses(state)
        return
      }

      // if there are no more scales, end the game
      state.isGameInProgress = false
    },
    initializeGame: (state, action: PayloadAction<GameState>) => {
      return action.payload
    },
    resetTriesLeft: (state) => {
      state.triesLeft = INTIAL_TRIES
    },
    setNoteStatus: (
      state,
      action: PayloadAction<{ noteFrequency: number; status: 'CORRECT' | 'MISSED_CORRECT' }>
    ) => {
      state.noteStatuses[action.payload.noteFrequency] = action.payload.status
    },
    clearNoteStatuses: (state) => {
      state.noteStatuses = {}
    }
  }
})

export const {
  decrementTriesLeft,
  incrementNote,
  incrementScore,
  initializeGame,
  resetTriesLeft,
  setNoteStatus,
  toggleNoteNames,
  clearNoteStatuses
} = gameSlice.actions

export default gameSlice.reducer
