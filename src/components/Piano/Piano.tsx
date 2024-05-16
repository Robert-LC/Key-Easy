'use client'
import React from 'react'
import { Range } from 'tonal'

import { createNoteFromTonal } from '@/utils/NoteUtils'
import { ENDING_NOTE, PIANO_SVG_CONSTANTS, STARTING_NOTE } from '@/utils/GameConstants'

import PianoKey from './PianoKey/PianoKey'
import { Note } from '../../types/Note'
import PianoPanel from './PianoPanel'

import './Piano.css'

const { WHITE_KEY_WIDTH, WHITE_KEY_HEIGHT, BASE_Y_COORD, KEY_BORDER_RADIUS, PANEL_HEIGHT } =
  PIANO_SVG_CONSTANTS

const createNotes = (): Note[] => {
  const noteNames = Range.chromatic([STARTING_NOTE, ENDING_NOTE])
  const notes = noteNames.map((note) => createNoteFromTonal(note))
  return notes
}

const createPianoKey = (xPosition: number, note: Note) => {
  return <PianoKey key={note.fullName} x={xPosition} y={BASE_Y_COORD} note={note} />
}

const createPanel = (yMin: number, totalWidth: number) => {
  return <PianoPanel y={yMin} width={totalWidth} />
}

const createSVGPiano = (whiteKeys: React.JSX.Element[], blackKeys: React.JSX.Element[]) => {
  const totalWidth = whiteKeys.length * WHITE_KEY_WIDTH
  const yMin = PANEL_HEIGHT * -1 + KEY_BORDER_RADIUS

  return (
    <svg
      className='piano'
      data-testid='piano'
      viewBox={`0 ${yMin} ${totalWidth} ${WHITE_KEY_HEIGHT + PANEL_HEIGHT}`}
    >
      <g>
        {whiteKeys}
        {blackKeys}
      </g>
      {createPanel(yMin, totalWidth)}
    </svg>
  )
}

const Piano = () => {
  const blackKeyIndices = new Set([0, 1, 3, 4, 5])

  const notes = createNotes()
  const isAllKeysRendered = () => whiteKeys.length + blackKeys.length >= notes.length

  // Use separate lists for keys due to SVG's lack of z-index support
  const whiteKeys: React.JSX.Element[] = []
  const blackKeys: React.JSX.Element[] = []
  let noteIndex = 0
  let dynamicXPosition = 0

  while (!isAllKeysRendered()) {
    whiteKeys.push(createPianoKey(dynamicXPosition, notes[noteIndex]))

    // Check if the current note has a black key next to it
    if (blackKeyIndices.has(dynamicXPosition % 7)) {
      noteIndex++
      blackKeys.push(createPianoKey(dynamicXPosition, notes[noteIndex]))
    }

    dynamicXPosition++
    noteIndex++
  }

  return <div className='m-4'>{createSVGPiano(whiteKeys, blackKeys)}</div>
}

export default Piano
