import { Note as TonalNote } from 'tonal'

import { Note } from '@/types/Note'

export const generateNameWithoutOctave = (letter: string, acc: string): string => {
  return letter + acc
}

export const createNoteFromTonal = (note: string): Note => {
  const { name: fullName, letter, oct: octave, acc: accidental } = TonalNote.get(note)
  return {
    fullName,
    nameNoOctave: generateNameWithoutOctave(letter, accidental),
    letter,
    octave,
    accidental
  }
}
