'use client'
import React from 'react'
import { Range } from 'tonal'

import { createNoteFromTonal } from '@/utils/NoteUtils'

// import PianoKey from './PianoKey/PianoKey'
import { Note } from '../../types/Note'
import WhiteKey from './PianoKey/WhiteKey'
import BlackKey from './PianoKey/BlackKey'
import Panel from './Panel'
import './Piano.css'

// Sizing constants
const WHITE_KEY_WIDTH = 30
const WHITE_KEY_HEIGHT = 100
const BLACK_KEY_WIDTH = WHITE_KEY_WIDTH * 0.7
const BLACK_KEY_HEIGHT = WHITE_KEY_HEIGHT * 0.65
const PANEL_HEIGHT = 12
const PANEL_SHADOW_HEIGHT = 4
const KEY_RADIUS = 4
const KEY_PADDING = 2

const createNotes = (): Note[] => {
  const noteNames = Range.chromatic(['C4', 'B5'])
  const notes = noteNames.map((note) => createNoteFromTonal(note))
  return notes
}

const Piano = () => {
  const blackKeyPattern = [1, 1, 0, 1, 1, 1, 0]

  const notes = createNotes()
  const allKeysRendered = () => whiteKeys.length + blackKeys.length >= notes.length

  /*
  have to use two seperate lists because SVG doesn't support z-index 
  and puts on top whatever is rendered last
  */
  const whiteKeys = []
  const blackKeys = []
  let currNoteIndex = 0
  let i = 0

  while (!allKeysRendered()) {
    whiteKeys.push(
      <WhiteKey
        x={i}
        y={0}
        width={WHITE_KEY_WIDTH}
        height={WHITE_KEY_HEIGHT}
        key={i}
        padding={KEY_PADDING}
        radius={KEY_RADIUS}
        note={notes[currNoteIndex]}
      />
    )

    // Check if the current note has a black key next to it
    if (blackKeyPattern[i % 7] === 1) {
      currNoteIndex++
      blackKeys.push(
        <BlackKey
          x={i}
          y={0}
          key={i + 0.5}
          width={BLACK_KEY_WIDTH}
          height={BLACK_KEY_HEIGHT}
          gridWidth={WHITE_KEY_WIDTH}
          radius={KEY_RADIUS}
          note={notes[currNoteIndex]}
        />
      )
    }
    i++
    currNoteIndex++
  }
  const totalWidth = whiteKeys.length * WHITE_KEY_WIDTH
  const yMin = PANEL_HEIGHT * -1 + KEY_RADIUS
  return (
    <div className='m-10'>
      <svg className='piano' viewBox={`0 ${yMin} ${totalWidth} ${WHITE_KEY_HEIGHT + PANEL_HEIGHT}`}>
        <g>
          {whiteKeys}
          {blackKeys}
        </g>
        <Panel
          y={yMin}
          width={totalWidth}
          height={PANEL_HEIGHT}
          shadowHeight={PANEL_SHADOW_HEIGHT}
          radius={KEY_RADIUS}
        />
      </svg>
    </div>
  )
}

export default Piano
