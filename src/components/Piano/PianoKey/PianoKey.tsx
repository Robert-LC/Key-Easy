import React from 'react'

import { Note } from '@/types/Note'
import { playSound } from '@/services/SoundService'
import { useGame } from '@/hooks/useGame'
import { PIANO_SVG_CONSTANTS, WHITE_KEY_COLOR } from '@/utils/GameConstants'
import { KeyColor } from '@/types/Types'
import { deriveColorFromNote } from '@/utils/NoteUtils'

type Props = {
  x: number
  y: number
  note: Note
  noteStatus?: 'CORRECT' | 'MISSED_CORRECT' | 'NONE'
}

const {
  WHITE_KEY_WIDTH,
  WHITE_KEY_HEIGHT,
  WHITE_KEY_TEXT_CLASS,
  WHITE_KEY_FONT_SIZE,
  BLACK_KEY_WIDTH,
  BLACK_KEY_HEIGHT,
  BLACK_KEY_TEXT_CLASS,
  BLACK_KEY_FONT_SIZE,
  KEY_PADDING,
  KEY_BORDER_RADIUS,
  DOMINANT_BASELINE,
  TEXT_ANCHOR
} = PIANO_SVG_CONSTANTS

const calcRectSVGValues = (color: KeyColor, xCoord: number, yCoord: number) => {
  let x, y, width, height

  if (color === WHITE_KEY_COLOR) {
    x = xCoord * WHITE_KEY_WIDTH + KEY_PADDING
    y = y
    width = WHITE_KEY_WIDTH - KEY_PADDING
    height = WHITE_KEY_HEIGHT
  } else {
    x = (xCoord + 1) * WHITE_KEY_WIDTH - BLACK_KEY_WIDTH / 2
    y = yCoord
    width = BLACK_KEY_WIDTH
    height = BLACK_KEY_HEIGHT
  }

  return { x, y, width, height }
}

const calcTextSVGValues = (color: KeyColor, xCoord: number, yCoord: number) => {
  let x, y, fontSize, className

  if (color === WHITE_KEY_COLOR) {
    x = WHITE_KEY_WIDTH * (xCoord + 0.5)
    y = yCoord + WHITE_KEY_HEIGHT - 10
    fontSize = WHITE_KEY_FONT_SIZE
    className = WHITE_KEY_TEXT_CLASS
  } else {
    xCoord = (xCoord + 1) * WHITE_KEY_WIDTH - BLACK_KEY_WIDTH / 2
    x = xCoord + BLACK_KEY_WIDTH / 2
    y = yCoord + BLACK_KEY_HEIGHT - 10
    fontSize = BLACK_KEY_FONT_SIZE
    className = BLACK_KEY_TEXT_CLASS
  }

  return { x, y, fontSize, className }
}

const PianoKey: React.FC<Props> = ({ x, y, note }) => {
  const color = deriveColorFromNote(note)

  const textSVGValues = calcTextSVGValues(color, x, y)
  const rectSVGValues = calcRectSVGValues(color, x, y)

  const { handleNoteClick, state } = useGame()

  const onKeyClick = (note: Note) => {
    playSound(note.fullName, 0.5)
    handleNoteClick(note)
  }

  // this is seperate from calcRectSVGValues because state is used
  const getRectClassName = (note: Note) => {
    switch (state.noteStatuses[note.fullName]) {
      case 'CORRECT':
        return 'green-key'
      case 'MISSED_CORRECT':
        return 'orange-key'
      default:
        return note.accidental ? 'black-key' : 'white-key'
    }
  }

  return (
    <g data-testid='piano-key'>
      <rect
        x={rectSVGValues.x}
        y={rectSVGValues.y}
        width={rectSVGValues.width}
        height={rectSVGValues.height}
        className={getRectClassName(note)}
        rx={KEY_BORDER_RADIUS}
        onClick={() => onKeyClick(note)}
      />
      {state.showNoteNames && (
        <text
          x={textSVGValues.x}
          y={textSVGValues.y}
          textAnchor={TEXT_ANCHOR}
          dominantBaseline={DOMINANT_BASELINE}
          className={textSVGValues.className}
          fontSize={textSVGValues.fontSize}
        >
          {note.nameNoOctave}
        </text>
      )}
    </g>
  )
}

export default PianoKey
