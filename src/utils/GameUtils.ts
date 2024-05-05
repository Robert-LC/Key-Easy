import { Range } from 'tonal'

import { Scale } from '@/types/Scale'

import { ScaleMode } from '../types/Types'
import { createScaleFromTonal } from './ScaleUtils'
import { stripOctave } from './NoteUtils'
import { ENDING_NOTE, STARTING_NOTE } from './GameConstants'

/**
 * Generates a random scale based on the given mode
 * @param mode - The mode of the scale (Major, Minor, or Both).
 * @returns A randomly generated scale.
 */
export const getRandomScale = (mode: ScaleMode): Scale => {
  const scale = createScaleFromTonal(
    `${getRandomNoteName()} ${mode === ScaleMode.Both ? getRandomMode() : mode.toLowerCase()}`
  )

  return scale
}

/**
 * Generates a random music mode.
 * @returns {string} The randomly generated music mode.
 */
const getRandomMode = (): string => {
  const modes = ['major', 'minor']
  return modes[Math.floor(Math.random() * modes.length)]
}

/**
 * Generates a random note name.
 * @returns A string representing a random note name.
 */
const getRandomNoteName = (): string => {
  const range = Range.chromatic([STARTING_NOTE, ENDING_NOTE])
  const notes = range.map((note) => stripOctave(note))
  return notes[Math.floor(Math.random() * notes.length)]
}
