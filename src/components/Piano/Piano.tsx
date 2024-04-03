'use client'
import React from 'react'
import { Range, Note as TonalNote } from 'tonal'

import PianoKey from './PianoKey/PianoKey'
import { Note } from '../../types/Note'

const createNotes = (): Note[] => {
  const noteNames = Range.chromatic(['C4', 'B5'])

  const notes = noteNames.map((note) => {
    const { name, letter, oct: octave, alt } = TonalNote.get(note)
    const accidentalType = alt === 1 ? 'Sharp' : alt === -1 ? 'Flat' : 'Natural'
    return {
      name,
      letter,
      octave,
      accidentalType
    } as Note
  })

  return notes
}

const Piano = () => {
  const notes = createNotes()

  return (
    <div className='flex items-center justify-center w-full h-full mb-10'>
      <div>
        {notes.map((element: Note) => (
          <PianoKey key={element.name} note={element} />
        ))}
      </div>
    </div>
  )
}

export default Piano
