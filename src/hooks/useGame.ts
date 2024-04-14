import { useContext } from 'react'

import { GameContext } from '@/contexts/GameContext'

export function useGame() {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used within a GameProvider')
  }

  const { state, dispatch } = context

  const incrementScoreAndNote = () => {
    dispatch({ type: 'INCREMENT_SCORE' })
    dispatch({ type: 'INCREMENT_NOTE' })
  }

  const decrementTriesOrReset = () => {
    dispatch({ type: 'DECREMENT_TRIES_LEFT' })

    if (state.triesLeft === 0) {
      dispatch({ type: 'INCREMENT_NOTE' })
      dispatch({ type: 'RESET_TRIES_LEFT' })
    }
  }

  return { state, incrementScoreAndNote, decrementTriesOrReset }
}
