'use client'
import React from 'react'
import { Range } from 'tonal'

import { createNoteFromTonal } from '@/utils/NoteUtils'
import { ENDING_NOTE, PIANO_SVG_CONSTANTS, STARTING_NOTE } from '@/utils/GameConstants'

import PianoKey from './PianoKey/PianoKey'
import { Note } from '../../types/Note'
import Panel from './Panel'

import './Piano.css'

// Sizing constants
const PANEL_HEIGHT = 12
const PANEL_SHADOW_HEIGHT = 4

const createNotes = (): Note[] => {
  const noteNames = Range.chromatic([STARTING_NOTE, ENDING_NOTE])
  const notes = noteNames.map((note) => createNoteFromTonal(note))
  return notes
}

const createPianoKey = (xPosition: number, note: Note) => {
  return <PianoKey x={xPosition} y={PIANO_SVG_CONSTANTS.BASE_Y_COORD} note={note} />
}

const createPanel = (
  yMin: number,
  totalWidth: number,
  height: number,
  shadowHeight: number,
  keyRadius: number
) => {
  return (
    <Panel
      y={yMin}
      width={totalWidth}
      height={height}
      shadowHeight={shadowHeight}
      radius={keyRadius}
    />
  )
}

const createSVGPiano = (whiteKeys: React.JSX.Element[], blackKeys: React.JSX.Element[]) => {
  const totalWidth = whiteKeys.length * PIANO_SVG_CONSTANTS.WHITE_KEY_WIDTH
  const yMin = PANEL_HEIGHT * -1 + PIANO_SVG_CONSTANTS.KEY_BORDER_RADIUS

  return (
    <svg
      className='piano'
      data-testid='piano'
      viewBox={`0 ${yMin} ${totalWidth} ${PIANO_SVG_CONSTANTS.WHITE_KEY_HEIGHT + PANEL_HEIGHT}`}
    >
      <g>
        {whiteKeys}
        {blackKeys}
      </g>
      {createPanel(
        yMin,
        totalWidth,
        PANEL_HEIGHT,
        PANEL_SHADOW_HEIGHT,
        PIANO_SVG_CONSTANTS.KEY_BORDER_RADIUS
      )}
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
