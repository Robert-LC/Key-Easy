import { Range } from 'tonal'

import { Scale } from '@/types/Scale'

import { ScaleMode } from '../types/Enums'
import { createScaleFromTonal } from './ScaleUtils'
import { stripOctave } from './NoteUtils'

const STARTING_NOTE = 'C4'
const ENDING_NOTE = 'B4'

/**
 * Generates a random scale based on the given mode and ensures it is different from the current scale.
 * @param mode - The mode of the scale (Major, Minor, or Both).
 * @param currentScale - The current scale to compare against.
 * @returns A randomly generated scale.
 */
export const getRandomScale = (mode: ScaleMode, currentScale?: Scale): Scale => {
  const scale = createScaleFromTonal(
    `${getRandomNoteName()} ${mode === ScaleMode.Both ? getRandomMode() : mode.toLowerCase()}`
  )

  if (!currentScale) {
    return scale
  }

  while (currentScale === scale) {
    getRandomScale(mode, currentScale)
  }

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
