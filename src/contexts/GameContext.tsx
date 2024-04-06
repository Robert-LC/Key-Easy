'use client'
import React, { createContext, useReducer } from 'react'

import { ScaleMode } from '@/types/Enums'

interface IProps {
  children: React.ReactNode
}

interface GameState {
  currentNote: string
  currentScale: string[]
  mode: ScaleMode
  nextNote: string
  nextScale: string[]
  score: number
  showNoteNames: boolean
  triesLeft: number
}

interface GameAction {
  type:
    | 'SET_MODE'
    | 'INCREMENT_SCORE'
    | 'NEXT_NOTE'
    | 'NEXT_SCALE'
    | 'RESET_SCORE'
    | 'SHOW_NOTE_NAMES'
  payload?: unknown | undefined
}

const STARTING_TRIES = 3
const STARTING_SCORE = 0

const initialState: GameState = {
  currentScale: [],
  currentNote: '',
  mode: ScaleMode.Major,
  nextNote: '',
  nextScale: [],
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
    case 'NEXT_NOTE':
      return { ...state, note: action.payload as string }
    case 'NEXT_SCALE':
      return { ...state, scale: action.payload as string[] }
    case 'RESET_SCORE':
      return { ...state, score: 0 }
    case 'SHOW_NOTE_NAMES':
      return { ...state, showNoteNames: action.payload as boolean }
    default:
      return state
  }
}

export const GameProvider = (props: IProps) => {
  const [state, dispatch] = useReducer(gameReducer, initialState)

  return <GameContext.Provider value={{ state, dispatch }}>{props.children}</GameContext.Provider>
}
