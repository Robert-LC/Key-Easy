import { Note as TonalNote } from 'tonal'

import { Note } from '@/types/Note'

/**
 * Creates a Note object from a Tonal note string.
 * @param noteName - The Tonal note name. E.g. 'C4', 'D#3', 'Fb2', 'A'
 * @returns The created Note object.
 */
export const createNoteFromTonal = (noteName: string): Note => {
  const { name: fullName, letter, oct: octave, acc: accidental } = TonalNote.get(noteName)
  return {
    fullName,
    nameNoOctave: letter + accidental,
    letter,
    octave,
    accidental
  }
}

export const stripOctave = (noteName: string): string => {
  return noteName.replace(/[0-9]/g, '')
}
