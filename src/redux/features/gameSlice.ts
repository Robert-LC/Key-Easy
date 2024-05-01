import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { GameState } from '@/types/GameState'
import { ScaleMode } from '@/types/Enums'

const INTIAL_TRIES = 3
const initialState = {
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
} as GameState

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
    initializeGame: (state, action: PayloadAction<GameState>) => {
      return action.payload
    },
    resetTriesLeft: (state) => {
      state.triesLeft = INTIAL_TRIES
    },
    setGameInProgress: (state, action: PayloadAction<boolean>) => {
      state.isGameInProgress = action.payload
    },
    setNoteStatus: (
      state,
      action: PayloadAction<{ noteName: string; status: 'CORRECT' | 'MISSED_CORRECT' | 'NONE' }>
    ) => {
      state.noteStatuses[action.payload.noteName] = action.payload.status
    },
    clearNoteStatuses: (state) => {
      state.noteStatuses = {}
    }
  }
})

export const {
  decrementTriesLeft,
  incrementNote,
  incrementScale,
  incrementScore,
  initializeGame,
  resetTriesLeft,
  setGameInProgress,
  setNoteStatus,
  toggleNoteNames,
  clearNoteStatuses
} = game.actions

export default game.reducer
