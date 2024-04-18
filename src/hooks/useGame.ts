import { useDispatch, useSelector } from 'react-redux'

import {
  decrementTriesLeft,
  incrementNote,
  incrementScale,
  incrementScore,
  resetTriesLeft,
  setGameInProgress,
  toggleNoteNames
} from '@/redux/features/gameSlice'
import { AppDispatch, RootState } from '@/redux/store'
import { Note } from '@/types/Note'

export const useGame = () => {
  const dispatch = useDispatch<AppDispatch>()
  const state = useSelector((state: RootState) => state.gameReducer)

  const handleShowNoteNames = () => {
    dispatch(toggleNoteNames())
  }

  const handleNoteClick = (note: Note) => {
    note.fullName === state.currentNote?.fullName ? handleCorrectNote() : handleIncorrectNote()
  }

  const handleCorrectNote = () => {
    incrementGame()
    dispatch(incrementScore())
  }

  const handleIncorrectNote = () => {
    dispatch(decrementTriesLeft())
    if (state.triesLeft === 1) {
      incrementGame()
    }
  }

  const incrementGame = () => {
    dispatch(incrementNote())
    dispatch(resetTriesLeft())
    if (!state.currentNote) {
      dispatch(incrementScale())
      dispatch(incrementNote())
      if (!state.currentScale) {
        dispatch(setGameInProgress(false))
      }
    }
  }

  return { handleNoteClick, handleShowNoteNames, state }
}
