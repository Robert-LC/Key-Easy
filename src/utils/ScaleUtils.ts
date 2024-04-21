import { Scale as TonalScale } from 'tonal'

import { Scale } from '@/types/Scale'

import { createNoteFromTonal } from './NoteUtils'

/**
 * Creates a scale object from a given scale name.
 * @param scaleName - The name of the scale.
 * @returns The scale object containing the name, notes, tonic, and type.
 */
export const createScaleFromTonal = (scaleName: string): Scale => {
  const { name, tonic, type, notes } = TonalScale.get(scaleName)
  return {
    name,
    notes: notes.map((note) => createNoteFromTonal(note)),
    tonic,
    type
  }
}
