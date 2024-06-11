import React from 'react'

import { Note } from '@/types/Note'
import { playSound } from '@/services/SoundService'
import { useGame } from '@/hooks/useGame'
import { DEFAULT_VOLUME, PIANO_SVG_CONSTANTS, WHITE_KEY_COLOR } from '@/utils/GameConstants'
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
  WHITE_KEY_TEXT_OFFSET,
  BLACK_KEY_WIDTH,
  BLACK_KEY_HEIGHT,
  BLACK_KEY_TEXT_CLASS,
  BLACK_KEY_FONT_SIZE,
  BLACK_KEY_TEXT_OFFSET,
  BASE_Y_OFFSET,
  KEY_PADDING,
  KEY_BORDER_RADIUS,
  DOMINANT_BASELINE,
  TEXT_ANCHOR
} = PIANO_SVG_CONSTANTS

const calcKeySVGValues = (color: KeyColor, xCoord: number, yCoord: number) => {
  let rectX, rectWidth, rectHeight, textX, textY, textFontSize, textClassName

  if (color === WHITE_KEY_COLOR) {
    rectX = xCoord * WHITE_KEY_WIDTH + KEY_PADDING
    rectWidth = WHITE_KEY_WIDTH - KEY_PADDING
    rectHeight = WHITE_KEY_HEIGHT
    textX = WHITE_KEY_WIDTH * (xCoord + WHITE_KEY_TEXT_OFFSET)
    textY = yCoord + WHITE_KEY_HEIGHT - BASE_Y_OFFSET
    textFontSize = WHITE_KEY_FONT_SIZE
    textClassName = WHITE_KEY_TEXT_CLASS
  } else {
    rectX = (xCoord + 1) * WHITE_KEY_WIDTH - BLACK_KEY_WIDTH / 2
    rectWidth = BLACK_KEY_WIDTH
    rectHeight = BLACK_KEY_HEIGHT
    textX = WHITE_KEY_WIDTH * (xCoord + BLACK_KEY_TEXT_OFFSET)
    textY = yCoord + BLACK_KEY_HEIGHT - BASE_Y_OFFSET
    textFontSize = BLACK_KEY_FONT_SIZE
    textClassName = BLACK_KEY_TEXT_CLASS
  }

  return { rectX, rectWidth, rectHeight, textX, textY, textFontSize, textClassName }
}

const PianoKey: React.FC<Props> = ({ x, y, note }) => {
  const color = deriveColorFromNote(note)

  const { rectX, rectWidth, rectHeight, textX, textY, textFontSize, textClassName } =
    calcKeySVGValues(color, x, y)

  const { handleNoteClick, state } = useGame()

  const onKeyClick = (note: Note) => {
    playSound(note.fullName, DEFAULT_VOLUME)
    handleNoteClick(note)
  }

  // this is seperate from calcKeySVGValues because state is used
  const getRectClassName = (note: Note) => {
    switch (state.noteStatuses[note.frequency]) {
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
        data-testid='piano-key-rect'
        x={rectX}
        width={rectWidth}
        height={rectHeight}
        className={getRectClassName(note)}
        rx={KEY_BORDER_RADIUS}
        onClick={() => onKeyClick(note)}
      />
      {state.showNoteNames && (
        <text
          data-testid='piano-key-text'
          x={textX}
          y={textY}
          textAnchor={TEXT_ANCHOR}
          dominantBaseline={DOMINANT_BASELINE}
          className={textClassName}
          fontSize={textFontSize}
        >
          {note.nameNoOctave}
        </text>
      )}
    </g>
  )
}

export default PianoKey
