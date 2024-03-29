'use client'
import React from 'react'

import PianoKey from './PianoKey/PianoKey'
import { NoteType } from './NoteType'

type Props = {
  notes: NoteType[]
}

const Piano: React.FC<Props> = ({ notes }) => (
  <div className='flex items-center justify-center m-14'>
    <div>
      {notes.map((element: NoteType) => (
        <PianoKey key={element.note} note={element.note} color={element.color} />
      ))}
    </div>
  </div>
)

export default Piano
