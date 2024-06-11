import { Note as TonalNote, Scale as TonalScale } from 'tonal'

import { BLACK_KEY_COLOR, WHITE_KEY_COLOR } from '@/utils/GameConstants'
import { Note } from '@/types/Note'
import { Scale } from '@/types/Scale'

import { stripNumbers } from './GeneralUtils'

/**
 * Creates a Note object from a Tonal note string.
 * @param noteName - The Tonal note name. E.g. 'C4', 'D#3', 'Fb2', 'A'
 * @returns The created Note object.
 */
export const createNoteFromTonal = (noteName: string): Note => {
  const {
    name: fullName,
    letter,
    freq: frequency,
    oct: octave,
    acc: accidental
  } = TonalNote.get(noteName)
  return {
    fullName,
    nameNoOctave: letter + accidental,
    letter,
    octave,
    accidental,
    frequency: frequency || 0
  }
}

export const stripOctave = (noteName: string): string => {
  return noteName.replace(/[0-9]/g, '')
}

export const deriveColorFromNote = (
  note: Note
): typeof BLACK_KEY_COLOR | typeof WHITE_KEY_COLOR => {
  if (note.accidental === '' || note.accidental === undefined) {
    return WHITE_KEY_COLOR
  }

  return BLACK_KEY_COLOR
}

// Given a note with an accidental, return its alternate name (eharmonic)
export const getAlternateName = (note: Note): string => {
  return TonalNote.enharmonic(note.fullName)
}

/* 
Check if two different notes are equal, usefull for checking if one note is an eharmonic of another note
Eg C#4 === Db4, same frequency, different name
*/
export const isEqualFrequency = (noteA: Note, noteB: Note): boolean => {
  return noteA.frequency === noteB.frequency
}

export const createNoteRangeFromScale = (scale: Scale, startOctave: number, endOctave: number) => {
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
