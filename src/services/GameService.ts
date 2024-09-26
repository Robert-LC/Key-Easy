import { ScaleMode } from '@/types/Types'
import { GameState } from '@/types/GameState'
import { Scale } from '@/types/Scale'
import { getRandomScale } from '@/utils/GameUtils'
import { DEFAULT_SCALE_AMOUNT, DEFAULT_TRIES_AMOUNT, INITIAL_SCORE } from '@/utils/GameConstants'

export const generateInitialGameState = (mode: ScaleMode = ScaleMode.Major): GameState => {
  const scales = createScalesStack(mode, DEFAULT_SCALE_AMOUNT)
  const currentScale = scales.pop()
  const notes = currentScale!.notes
  const currentNote = notes.shift()

  return {
    scales: scales,
    notes: notes,
    currentNote: currentNote,
    currentScale: currentScale,
    isGameInProgress: true,
    mode: ScaleMode.Major,
    noteStatuses: {},
    score: INITIAL_SCORE,
    showNoteNames: false,
    triesRemaining: DEFAULT_TRIES_AMOUNT,
    triesPerNote: DEFAULT_TRIES_AMOUNT
  }
}

// Helper functions

const createScalesStack = (mode: ScaleMode, amount: number): Scale[] => {
  const scales: Scale[] = []

  let i = 0
  while (i < amount) {
    const randomScale = getRandomScale(mode)

    if (!scales.includes(randomScale)) {
      scales.push(randomScale)
      i++
    }
  }

  return scales
}

// const endGame() => {
//   // save all the scores to storage
//   // ask if they want to play again...
//   // do other endgame stuff
// }
