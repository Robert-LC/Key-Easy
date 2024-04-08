'use client'
import React, { createContext, useReducer } from 'react'

import { getNextNote, getNextScale } from '@/services/GameService'
import { ScaleMode } from '@/types/Enums'
import { Scale } from '@/types/Scale'
import { Note } from '@/types/Note'

interface Props {
  children: React.ReactNode
}

interface GameState {
  notes: Note[] // Used as a queue
  scales: Scale[] // Used as a stack
  mode: ScaleMode
  score: number
  showNoteNames: boolean
  triesLeft: number
}

interface GameAction {
  type:
    | 'SET_MODE'
    | 'INCREMENT_SCORE'
    | 'INCREMENT_NOTE'
    | 'INCREMENT_SCALE'
    | 'RESET_SCORE'
    | 'SHOW_NOTE_NAMES'
  payload?: unknown | undefined
}

const STARTING_TRIES = 3
const STARTING_SCORE = 0

const initialState: GameState = {
  scales: [],
  notes: [],
  mode: ScaleMode.Major,
  score: STARTING_SCORE,
  showNoteNames: false,
  triesLeft: STARTING_TRIES
}

export const GameContext = createContext<
  { state: GameState; dispatch: React.Dispatch<GameAction> } | undefined
>(undefined)

const gameReducer = (state: GameState, action: GameAction) => {
  switch (action.type) {
    case 'SET_MODE':
      return { ...state, mode: action.payload as ScaleMode }
    case 'INCREMENT_SCORE':
      return { ...state, score: state.score + 1 }
    case 'INCREMENT_NOTE':
      const note = getNextNote(state.notes)
      return { ...state, note: note }
    case 'INCREMENT_SCALE':
      const scale = getNextScale(state.scales)
      return { ...state, scale: scale }
    case 'RESET_SCORE':
      return { ...state, score: 0 }
    case 'SHOW_NOTE_NAMES':
      return { ...state, showNoteNames: action.payload as boolean }
    default:
      return state
  }
}

export const GameProvider = (props: Props) => {
  const [state, dispatch] = useReducer(gameReducer, initialState)

  return <GameContext.Provider value={{ state, dispatch }}>{props.children}</GameContext.Provider>
}
