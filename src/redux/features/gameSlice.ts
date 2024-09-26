import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { GameState } from '@/types/GameState'
import { ScaleMode } from '@/types/Types'
import { generateInitialGameState } from '@/services/GameService'
import { DEFAULT_TRIES_AMOUNT } from '@/utils/GameConstants'

export const initialState: GameState = {
  notes: [],
  scales: [],
  currentNote: undefined,
  currentScale: undefined,
  isGameInProgress: true,
  mode: ScaleMode.Major,
  score: 0,
  showNoteNames: true,
  triesRemaining: DEFAULT_TRIES_AMOUNT,
  triesPerNote: DEFAULT_TRIES_AMOUNT,
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
      state.triesRemaining--
    },
    incrementScore: (state) => {
      state.score++
    },
    incrementNote: (state) => {
      gameSlice.caseReducers.resetTriesRemaining(state)

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

      // if there are no remaining scales, end the game
      gameSlice.caseReducers.setGameOver(state)
    },
    resetTriesRemaining: (state) => {
      state.triesRemaining = state.triesPerNote
    },
    setTriesPerNote: (state, action: PayloadAction<number>) => {
      state.triesPerNote = action.payload
    },
    setScaleMode: (state, action: PayloadAction<ScaleMode>) => {
      state.mode = action.payload
    },
    setNoteStatus: (
      state,
      action: PayloadAction<{ noteFrequency: number; status: 'CORRECT' | 'MISSED_CORRECT' }>
    ) => {
      state.noteStatuses[action.payload.noteFrequency] = action.payload.status
    },
    clearNoteStatuses: (state) => {
      state.noteStatuses = {}
    },
    setGameOver: (state) => {
      state.isGameInProgress = false
    },
    resetGame: (state, action: PayloadAction<Partial<GameState>>) => {
      console.log(action.payload.mode)
      const newState = generateInitialGameState(action.payload.mode)
      newState.triesPerNote = action.payload.triesPerNote as number
      newState.triesRemaining = state.triesPerNote
      Object.assign(state, { ...newState })
    }
  }
})

export const {
  decrementTriesLeft,
  incrementNote,
  incrementScore,
  resetGame,
  resetTriesRemaining,
  setTriesPerNote,
  setScaleMode,
  setNoteStatus,
  toggleNoteNames,
  clearNoteStatuses
} = gameSlice.actions

export default gameSlice.reducer
