import { ScaleMode } from '@/types/Enums'
import { GameState } from '@/types/GameState'
import { Scale } from '@/types/Scale'
import { getRandomScale } from '@/utils/GameUtils'

const DEFAULT_SCALE_AMOUNT = 5

export const generateInitialGameState = (): GameState => {
  const scales = createScalesStack(ScaleMode.Major, DEFAULT_SCALE_AMOUNT)
  const currentScale = scales.pop()
  const notes = currentScale?.notes || []
  const currentNote = notes.shift()
  const noteStatuses: Record<string, 'CORRECT' | 'MISSED_CORRECT' | 'NONE'> = {}

  notes.forEach((note) => {
    noteStatuses[note.nameNoOctave] = 'NONE'
  })

  return {
    scales: scales,
    notes: notes,
    currentNote: currentNote,
    currentScale: currentScale,
    isGameInProgress: true,
    mode: ScaleMode.Major,
    noteStatuses: {},
    score: 0,
    showNoteNames: false,
    triesLeft: 3
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
