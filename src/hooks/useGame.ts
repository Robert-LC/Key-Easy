import {
  decrementTriesLeft,
  incrementNote,
  incrementScore,
  resetGame,
  setNoteStatus,
  toggleNoteNames
} from '@/redux/features/gameSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { AppDispatch, RootState } from '@/redux/store'
import { Note } from '@/types/Note'
import { isEqualFrequency } from '@/utils/NoteUtils'

export const useGame = () => {
  const dispatch = useAppDispatch<AppDispatch>()
  const state = useAppSelector((state: RootState) => state.game)

  const handleShowNoteNames = () => {
    dispatch(toggleNoteNames())
  }

  const handleNoteClick = (clickedNote: Note) => {
    isEqualFrequency(state.currentNote!, clickedNote) ? handleCorrectNote() : handleIncorrectNote()
  }

  const handleCorrectNote = () => {
    dispatch(setNoteStatus({ noteFrequency: state.currentNote!.frequency!, status: 'CORRECT' }))
    dispatch(incrementScore())

    dispatch(incrementNote())
  }

  const handleIncorrectNote = () => {
    dispatch(decrementTriesLeft())

    if (state.triesLeft === 1) {
      dispatch(
        setNoteStatus({ noteFrequency: state.currentNote!.frequency!, status: 'MISSED_CORRECT' })
      )
      dispatch(incrementNote())
    }
  }

  const handleResetGame = () => {
    dispatch(resetGame())
  }

  return { handleNoteClick, handleShowNoteNames, handleResetGame, state }
}
