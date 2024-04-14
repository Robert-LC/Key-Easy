import { ScaleMode } from '@/types/Enums'
import { Note } from '@/types/Note'
import { Scale } from '@/types/Scale'
import { getRandomScale } from '@/utils/GameUtils'
import { GameState } from '@/contexts/GameContext'

export const generateInitialGameState = (): GameState => {
  const scales = createScalesStack(ScaleMode.Major, 5)
  const currentScale = scales.pop()
  const notes = currentScale?.notes || []
  const currentNote = notes.shift()
  return {
    scales: scales,
    notes: notes,
    currentNote: currentNote,
    currentScale: currentScale,
    isGameInProgress: true,
    mode: ScaleMode.Major,
    score: 0,
    showNoteNames: false,
    triesLeft: 3
  }
}

export const isNoteCorrect = (clickedNote: Note, state: GameState): boolean => {
  const isCorrect = state.currentNote?.nameNoOctave === clickedNote.nameNoOctave

  return isCorrect
}

// Helper functions

const createScalesStack = (mode: ScaleMode, amount: number): Scale[] => {
  const scales = []

  for (let i = 0; i < amount; i++) {
    scales.push(getRandomScale(mode))
  }

  return scales
}

// const endGame() => {
//   // save all the scores to storage
//   // ask if they want to play again...
//   // do other endgame stuff
// }
