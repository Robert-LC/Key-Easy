'use client'
import React, { createContext, useEffect, useReducer } from 'react'

import { generateInitialGameState, getNextNote, getNextScale } from '@/services/GameService'
import { ScaleMode } from '@/types/Enums'
import { Scale } from '@/types/Scale'
import { Note } from '@/types/Note'

interface Props {
  children: React.ReactNode
}

export interface GameState {
  notes: Note[] // Used as a queue
  scales: Scale[] // Used as a stack
  mode: ScaleMode
  score: number
  showNoteNames: boolean
  triesLeft: number
}

const placeholderGameState: GameState = {
  notes: [],
  scales: [],
  mode: ScaleMode.Major,
  score: 0,
  showNoteNames: false,
  triesLeft: 3
}

interface GameAction {
  type:
    | 'SET_MODE'
    | 'SET_SCALE'
    | 'INCREMENT_SCORE'
    | 'INCREMENT_NOTE'
    | 'INCREMENT_SCALE'
    | 'INITIALIZE_GAME'
    | 'RESET_SCORE'
    | 'SHOW_NOTE_NAMES'
  payload?: unknown | undefined
}

export const GameContext = createContext<
  { state: GameState; dispatch: React.Dispatch<GameAction> } | undefined
>(undefined)

const gameReducer = (state: GameState, action: GameAction) => {
  switch (action.type) {
    case 'SET_MODE':
      return { ...state, mode: action.payload as ScaleMode }
    case 'SET_SCALE':
      return { ...state, scale: action.payload as Scale }
    case 'INCREMENT_SCORE':
      return { ...state, score: state.score + 1 }
    case 'INCREMENT_NOTE':
      const note = getNextNote(state.notes)
      return { ...state, note: note }
    case 'INCREMENT_SCALE':
      const scale = getNextScale(state.scales)
      return { ...state, scale: scale }
    case 'INITIALIZE_GAME':
      return action.payload as GameState
    case 'RESET_SCORE':
      return { ...state, score: 0 }
    case 'SHOW_NOTE_NAMES':
      return { ...state, showNoteNames: action.payload as boolean }
    default:
      return state
  }
}

export const GameProvider = (props: Props) => {
  // Initialize with a placeholder state, to fix hydration errors that are caused by the randomness of the game
  const [state, dispatch] = useReducer(gameReducer, placeholderGameState)

  // Wait till the component is mounted, before generating the initial game state
  useEffect(() => {
    dispatch({ type: 'INITIALIZE_GAME', payload: generateInitialGameState() })
  }, [])

  return <GameContext.Provider value={{ state, dispatch }}>{props.children}</GameContext.Provider>
}
