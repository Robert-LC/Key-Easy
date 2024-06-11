import {
  decrementTriesLeft,
  incrementNote,
  incrementScore,
  setNoteStatus,
  toggleNoteNames
} from '@/redux/features/gameSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { AppDispatch, RootState } from '@/redux/store'
import { Note } from '@/types/Note'

export const useGame = () => {
  const dispatch = useAppDispatch<AppDispatch>()
  const state = useAppSelector((state: RootState) => state.game)

  const handleShowNoteNames = () => {
    dispatch(toggleNoteNames())
  }

  const handleNoteClick = (clickedNote: Note) => {
    clickedNote.fullName === state.currentNote?.fullName
      ? handleCorrectNote()
      : handleIncorrectNote()
  }

  const handleCorrectNote = () => {
    dispatch(setNoteStatus({ noteName: state.currentNote!.fullName, status: 'CORRECT' }))
    dispatch(incrementScore())

    dispatch(incrementNote())
  }

  const handleIncorrectNote = () => {
    dispatch(decrementTriesLeft())

    if (state.triesLeft === 1) {
      dispatch(setNoteStatus({ noteName: state.currentNote!.fullName, status: 'MISSED_CORRECT' }))
      dispatch(incrementNote())
    }
  }

  return { handleNoteClick, handleShowNoteNames, state }
}
