'use client'
import React, { createContext, useEffect, useState } from 'react'
import { useImmerReducer } from 'use-immer'
import { produce } from 'immer'

import { generateInitialGameState, isNoteCorrect } from '@/services/GameService'
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
    | 'CHECK_NOTE_ANSWER'
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
    case 'CHECK_NOTE_ANSWER':
      if (draft.notes.length === 0) {
        draft.currentScale = draft.scales.pop()
        // if currentScale is undefined, end game
        if (draft.currentScale === undefined) {
          //end game
          return
        }
        break
      }

      if (draft.currentScale) {
        draft.notes = draft.currentScale.notes

        if (isNoteCorrect(action.payload as Note, draft)) {
          draft.score += 1
          draft.currentNote = draft.notes.shift()
          return
        }
      }

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

  useEffect(() => {
    dispatch({ type: 'INITIALIZE_GAME', payload: generateInitialGameState() })
    setLoading(false)
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return <GameContext.Provider value={{ state, dispatch }}>{props.children}</GameContext.Provider>
}
