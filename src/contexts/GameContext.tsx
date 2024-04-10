'use client'
import React, { createContext, useEffect } from 'react'
import { useImmerReducer } from 'use-immer'
import { produce } from 'immer'

import { generateInitialGameState } from '@/services/GameService'
import { ScaleMode } from '@/types/Enums'
import { Scale } from '@/types/Scale'
import { Note } from '@/types/Note'

interface Props {
  children: React.ReactNode
}

export interface GameState {
  notes: Note[]
  scales: Scale[]
  currentNote?: Note
  currentScale?: Scale
  mode: ScaleMode
  score: number
  showNoteNames: boolean
  triesLeft: number
}

const placeholderGameState: GameState = {
  notes: [],
  scales: [],
  currentNote: undefined,
  currentScale: undefined,
  mode: ScaleMode.Major,
  score: 0,
  showNoteNames: false,
  triesLeft: 3
}

interface GameAction {
  type:
    | 'SET_MODE'
    | 'INCREMENT_SCORE'
    | 'INCREMENT_NOTE'
    | 'INCREMENT_SCALE'
    | 'INITIALIZE_GAME'
    | 'RESET_SCORE'
    | 'SHOW_NOTE_NAMES'
    | 'CHECK_NOTE_ANSWER'
  payload?: unknown | undefined
}

export const GameContext = createContext<
  { state: GameState; dispatch: React.Dispatch<GameAction> } | undefined
>(undefined)

const gameReducer = produce((draft: GameState, action: GameAction) => {
  switch (action.type) {
    case 'SET_MODE':
      draft.mode = action.payload as ScaleMode
      break
    case 'INCREMENT_SCORE':
      draft.score += 1
      break
    case 'INCREMENT_NOTE':
      draft.currentNote = draft.notes.shift()
      break
    case 'INCREMENT_SCALE':
      draft.currentScale = draft.scales.pop()
    case 'INITIALIZE_GAME':
      return action.payload as GameState
    case 'SHOW_NOTE_NAMES':
      draft.showNoteNames = action.payload as boolean
      break
    default:
      break
  }
})

export const GameProvider = (props: Props) => {
  // Initialize with a placeholder state, to fix hydration errors that are caused by the randomness of the game
  const [state, dispatch] = useImmerReducer(gameReducer, placeholderGameState)

  // Wait till the component is mounted, before generating the initial game state
  useEffect(() => {
    dispatch({ type: 'INITIALIZE_GAME', payload: generateInitialGameState() })
  }, [])

  return <GameContext.Provider value={{ state, dispatch }}>{props.children}</GameContext.Provider>
}
