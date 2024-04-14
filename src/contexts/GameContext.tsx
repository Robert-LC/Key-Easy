'use client'
import React, { createContext, useEffect, useRef, useState } from 'react'
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
  isGameInProgress: boolean
  mode: ScaleMode
  score: number
  showNoteNames: boolean
  triesLeft: number
}

interface GameAction {
  type:
    | 'DECREMENT_TRIES_LEFT'
    | 'CHECK_NOTE_ANSWER'
    | 'SET_MODE'
    | 'INCREMENT_SCORE'
    | 'INCREMENT_NOTE'
    | 'INCREMENT_SCALE'
    | 'INITIALIZE_GAME'
    | 'RESET_TRIES_LEFT'
    | 'SHOW_NOTE_NAMES'
    | 'CHECK_NOTE_ANSWER'
  payload?: unknown | undefined
}

export const GameContext = createContext<
  { state: GameState; dispatch: React.Dispatch<GameAction> } | undefined
>(undefined)

const gameReducer = produce((draft: GameState, action: GameAction) => {
  switch (action.type) {
    case 'DECREMENT_TRIES_LEFT':
      draft.triesLeft -= 1
      break
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
    case 'RESET_TRIES_LEFT':
      draft.triesLeft = 3
      break
    case 'SHOW_NOTE_NAMES':
      draft.showNoteNames = action.payload as boolean
      break
    default:
      break
  }
})

export const GameProvider = (props: Props) => {
  const [state, dispatch] = useImmerReducer(gameReducer, null as unknown as GameState)
  const [loading, setLoading] = useState(true)
  const initialized = useRef(false)

  useEffect(() => {
    if (!initialized.current) {
      dispatch({ type: 'INITIALIZE_GAME', payload: generateInitialGameState() })
      setLoading(false)
      initialized.current = true
    }
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return <GameContext.Provider value={{ state, dispatch }}>{props.children}</GameContext.Provider>
}
