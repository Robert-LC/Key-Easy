import {
  decrementTriesLeft,
  incrementNote,
  incrementScore,
  resetGame,
  setNoteStatus,
  setScaleMode,
  setTriesPerNote,
  toggleNoteNames
} from '@/redux/features/gameSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { AppDispatch } from '@/redux/store'
import { GameState } from '@/types/GameState'
import { Note } from '@/types/Note'
import { isEqualFrequency } from '@/utils/NoteUtils'

export const useGame = () => {
  const dispatch = useAppDispatch<AppDispatch>()
  const state = useAppSelector((state: { game: GameState }) => state.game)

  const handleShowNoteNames = () => {
    dispatch(toggleNoteNames())
  }

  const handleNoteClick = (clickedNote: Note) => {
    if (!state.isGameInProgress) return
    isEqualFrequency(state.currentNote!, clickedNote) ? handleCorrectNote() : handleIncorrectNote()
  }

  const handleCorrectNote = () => {
    dispatch(setNoteStatus({ noteFrequency: state.currentNote!.frequency!, status: 'CORRECT' }))
    dispatch(incrementScore())

    dispatch(incrementNote())
  }

  const handleIncorrectNote = () => {
    dispatch(decrementTriesLeft())

    if (state.triesRemaining === 1) {
      dispatch(
        setNoteStatus({ noteFrequency: state.currentNote!.frequency!, status: 'MISSED_CORRECT' })
      )

      dispatch(incrementNote())
    }
  }

  const handleResetGame = () => {
    const emptyOptions: Partial<GameState> = {}
    dispatch(resetGame(emptyOptions))
  }

  //have it on save just take everything in the settings, update those fields and reset entire game
  const handleUpdateSettings = (newSettings: Partial<GameState>) => {
    if (newSettings.triesPerNote) {
      dispatch(setTriesPerNote(newSettings.triesPerNote))
    }

    if (newSettings.mode) {
      dispatch(setScaleMode(newSettings.mode))
    }

    dispatch(resetGame(newSettings))
  }

  return { handleNoteClick, handleShowNoteNames, handleResetGame, handleUpdateSettings, state }
}
