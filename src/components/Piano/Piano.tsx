'use client'
import React from 'react'
import { Range } from 'tonal'

import { createNoteFromTonal } from '@/utils/NoteUtils'
import { BLACK_KEY_COLOR, ENDING_NOTE, STARTING_NOTE, WHITE_KEY_COLOR } from '@/utils/GameConstants'
import { deriveColorFromNote } from '@/utils/NoteUtils'

import PianoKey from './PianoKey/PianoKey'
import { Note } from '../../types/Note'
import Panel from './Panel'

import './Piano.css'

// Sizing constants
const WHITE_KEY_WIDTH = 30
const WHITE_KEY_HEIGHT = 95
const BLACK_KEY_OFFSET = 0.5
const BLACK_KEY_WIDTH = WHITE_KEY_WIDTH * 0.7
const BLACK_KEY_HEIGHT = WHITE_KEY_HEIGHT * 0.65
const PANEL_HEIGHT = 12
const PANEL_SHADOW_HEIGHT = 4
const KEY_RADIUS = 4
const KEY_PADDING = 1.5
const Y_POSITION = 0

const createNotes = (): Note[] => {
  const noteNames = Range.chromatic([STARTING_NOTE, ENDING_NOTE])
  const notes = noteNames.map((note) => createNoteFromTonal(note))
  return notes
}

const createPianoKey = (xPosition: number, note: Note) => {
  const color = deriveColorFromNote(note)

  return (
    <PianoKey
      x={xPosition}
      y={Y_POSITION}
      width={color === WHITE_KEY_COLOR ? WHITE_KEY_WIDTH : BLACK_KEY_WIDTH}
      height={color === WHITE_KEY_COLOR ? WHITE_KEY_HEIGHT : BLACK_KEY_HEIGHT}
      key={color === WHITE_KEY_COLOR ? xPosition : xPosition + BLACK_KEY_OFFSET}
      padding={KEY_PADDING}
      radius={KEY_RADIUS}
      color={color}
      note={note}
      gridWidth={color === BLACK_KEY_COLOR ? WHITE_KEY_WIDTH : undefined}
    />
  )
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
  const totalWidth = whiteKeys.length * WHITE_KEY_WIDTH
  const yMin = PANEL_HEIGHT * -1 + KEY_RADIUS

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
      {createPanel(yMin, totalWidth, PANEL_HEIGHT, PANEL_SHADOW_HEIGHT, KEY_RADIUS)}
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
