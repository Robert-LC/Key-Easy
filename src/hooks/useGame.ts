import {
  decrementTriesLeft,
  incrementNote,
  incrementScale,
  incrementScore,
  resetTriesLeft,
  setGameInProgress,
  toggleNoteNames
} from '@/redux/features/gameSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { AppDispatch, RootState } from '@/redux/store'
import { Note } from '@/types/Note'

export const useGame = () => {
  const dispatch = useAppDispatch<AppDispatch>()
  const state = useAppSelector((state: RootState) => state.gameReducer)

  const handleShowNoteNames = () => {
    dispatch(toggleNoteNames())
  }

  const handleNoteClick = (note: Note) => {
    note.nameNoOctave === state.currentNote?.nameNoOctave
      ? handleCorrectNote()
      : handleIncorrectNote()
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
