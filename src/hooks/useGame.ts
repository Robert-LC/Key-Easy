import { useDispatch, useSelector } from 'react-redux'

import { decrementTriesLeft, incrementNote, incrementScore } from '@/redux/features/gameSlice'
import { AppDispatch, RootState } from '@/redux/store'
import { Note } from '@/types/Note'

export function useGame() {
  const dispatch = useDispatch<AppDispatch>()
  const state = useSelector((state: RootState) => state.gameReducer)

  const handleNoteClick = (note: Note) => {
    if (note.fullName === state.currentNote?.fullName) {
      handleIncrementScore()
      handleIncrementNote()
    } else {
      handleDecrementTriesLeft()
    }
  }

  const handleDecrementTriesLeft = () => {
    dispatch(decrementTriesLeft())
  }

  const handleIncrementScore = () => {
    dispatch(incrementScore())
  }

  const handleIncrementNote = () => {
    dispatch(incrementNote())
  }

  return { handleNoteClick, state }
}
