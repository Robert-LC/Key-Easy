import { Scale as TonalScale } from 'tonal'

import { ScaleMode } from '@/types/Types'
import { GameState } from '@/types/GameState'
import { Scale } from '@/types/Scale'
import { getRandomScale } from '@/utils/GameUtils'
import { stripNumbers } from '@/utils/GeneralUtils'
import { createNoteFromTonal } from '@/utils/NoteUtils'
import { INITIAL_SCORE } from '@/utils/GameConstants'

const DEFAULT_SCALE_AMOUNT = 5

export const generateInitialGameState = (): GameState => {
  const scales = createScalesStack(ScaleMode.Major, DEFAULT_SCALE_AMOUNT)
  const currentScale = scales.pop()
  const notes = createNoteRangeFromScale(currentScale!, 4, 5)
  const currentNote = notes.shift()
  const noteStatuses: Record<string, 'CORRECT' | 'MISSED_CORRECT' | 'NONE'> = {}

  notes.forEach((note) => {
    noteStatuses[note.fullName] = 'NONE'
  })

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

const createNoteRangeFromScale = (scale: Scale, startOctave: number, endOctave: number) => {
  const scaleName = stripNumbers(scale.name)
  const fullRange = TonalScale.rangeOf(scaleName)

  if (fullRange === undefined) {
    throw new Error(`Range of ${scaleName} is undefined, did you pass in a valid scale name?`)
  }

  const startNote = `${scale.notes[0].nameNoOctave}${startOctave}`
  const endNote = `${scale.notes[scale.notes.length - 1].nameNoOctave}${endOctave}`

  const noteRange = fullRange(startNote, endNote).map((noteName) => {
    if (noteName === undefined) {
      throw new Error(
        'noteName is undefined in createNoteRangeFromScale, did you pass in a valid startNote and endNote?'
      )
    }

    return createNoteFromTonal(noteName)
  })

  return noteRange
}

// const endGame() => {
//   // save all the scores to storage
//   // ask if they want to play again...
//   // do other endgame stuff
// }
