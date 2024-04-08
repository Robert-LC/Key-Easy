import { ScaleMode } from '@/types/Enums'
import { Note } from '@/types/Note'
import { Scale } from '@/types/Scale'
import { getRandomScale } from '@/utils/GameUtils'
import { GameState } from '@/contexts/GameContext'

/**
 * Retrieves the next note from the given array of notes.
 * This function implements a queue-based approach to track the current note and the remaining notes.
 *
 * @param notes - The array of notes.
 * @returns The next note, or `undefined` if there are no more notes.
 */
export const getNextNote = (notes: Note[]): void | Note => {
  // queue implentation, because we need FIFO and need to track current and next notes in one place
  const nextNote = notes.shift()

  if (!nextNote) {
    return
  }

  return nextNote
}

/**
 * Retrieves the next scale from the given array of scales.
 * This function implements a stack-based approach to track the current scale and the remaining scales.
 *
 * @param scales - An array of scales.
 * @returns The next scale from the array, or `undefined` if there are no more scales.
 */
export const getNextScale = (scales: Scale[]): void | Scale => {
  const nextScale = scales.pop()

  if (!nextScale) {
    // endGame()
  }

  return nextScale
}

export const generateInitialGameState = (): GameState => {
  const scales = createScalesStack(ScaleMode.Major, 5)
  const notes = createNotesQueue(scales[0])

  return {
    scales,
    notes,
    mode: ScaleMode.Major,
    score: 0,
    showNoteNames: false,
    triesLeft: 3
  }
}

// Helper functions

const createScalesStack = (mode: ScaleMode, amount: number): Scale[] => {
  const scales = []

  for (let i = 0; i < amount; i++) {
    scales.push(getRandomScale(mode))
  }

  return scales
}

const createNotesQueue = (scale: Scale): Note[] => {
  return scale.notes
}

// const endGame() => {
//   // save all the scores to storage
//   // ask if they want to play again...
//   // do other endgame stuff
// }
