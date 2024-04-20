'use client'
import React from 'react'
import { Range } from 'tonal'

import { createNoteFromTonal } from '@/utils/NoteUtils'

import PianoKey from './PianoKey/PianoKey'
import { Note } from '../../types/Note'

const createNotes = (): Note[] => {
  const noteNames = Range.chromatic(['C4', 'B5'])
  const notes = noteNames.map((note) => createNoteFromTonal(note))
  return notes
}

const Piano = () => {
  const notes = createNotes()
  return (
    <div className='flex items-center justify-center h-full w-full mb-10'>
      <div className='min-h-[410px] max-h-[410px]'>
        {notes.map((element: Note) => (
          <PianoKey key={element.fullName} $note={element} />
        ))}
      </div>
    </div>
  )
}

export default Piano
