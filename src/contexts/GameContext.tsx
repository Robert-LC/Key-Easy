'use client'
import React, { createContext, useReducer } from 'react'
interface IProps {
  children: React.ReactNode
}

interface GameState {
  score: number
  scale: string[]
  note: string
  mode: 'Major' | 'Minor' | 'Both'
}

interface GameAction {
  type: 'SET_MODE' | 'INCREMENT_SCORE' | 'NEXT_NOTE' | 'NEXT_SCALE' | 'RESET_SCORE'
  payload?: unknown | undefined
}

const initialState: GameState = {
  score: 0,
  scale: [],
  note: '',
  mode: 'Major'
}
const GameContext = createContext<
  { state: GameState; dispatch: React.Dispatch<GameAction> } | undefined
>(undefined)

const gameReducer = (state: GameState, action: GameAction) => {
  switch (action.type) {
    case 'SET_MODE':
      return { ...state, mode: action.payload as 'Major' | 'Minor' | 'Both' }
    case 'INCREMENT_SCORE':
      return { ...state, score: state.score + 1 }
    case 'NEXT_NOTE':
      return { ...state, note: action.payload as string }
    case 'NEXT_SCALE':
      return { ...state, scale: action.payload as string[] }
    case 'RESET_SCORE':
      return { ...state, score: 0 }
    default:
      return state
  }
}

export const GameProvider = (props: IProps) => {
  const [state, dispatch] = useReducer(gameReducer, initialState)

  return <GameContext.Provider value={{ state, dispatch }}>{props.children}</GameContext.Provider>
}
