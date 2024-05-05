import React from 'react'

import { Note } from '@/types/Note'
import { playSound } from '@/services/SoundService'
import { useGame } from '@/hooks/useGame'
import { WHITE_KEY_COLOR } from '@/utils/GameConstants'
import { KeyColor } from '@/types/Types'

type Props = {
  //visual
  x: number
  y: number
  width: number
  height: number
  radius: number
  padding?: number
  gridWidth?: number
  color: KeyColor

  //funcitonal
  note: Note
  noteStatus?: 'CORRECT' | 'MISSED_CORRECT' | 'NONE'
}

const PianoKey: React.FC<Props> = ({
  x,
  y,
  width,
  height,
  radius,
  padding = 0,
  color,
  gridWidth = 0,
  note
}) => {
  const { handleNoteClick, state } = useGame()

  const onKeyClick = (note: Note) => {
    playSound(note.fullName, 0.5)
    handleNoteClick(note)
  }

  const calculateRectXPosition = (color: KeyColor, x: number, gridWidth: number, width: number) => {
    let rectPosition
    if (color === WHITE_KEY_COLOR) {
      rectPosition = x * width + padding / 2
    } else {
      rectPosition = (x + 1) * gridWidth - width / 2
    }

    return rectPosition
  }

  const calculateTextXPosition = (color: KeyColor, x: number, width: number) => {
    let textPosition
    if (color === WHITE_KEY_COLOR) {
      textPosition = width * (x + 0.5)
    } else {
      x = (x + 0.97) * gridWidth - width / 2
      textPosition = x + width / 2
    }

    return textPosition
  }

  const generateKeySVG = (
    color: KeyColor,
    radius: number,
    padding: number,
    gridWidth: number,
    note: Note
  ) => {
    const isWhiteKey = color === WHITE_KEY_COLOR
    const rectWidth = width - padding
    const rectPositionX = calculateRectXPosition(color, x, gridWidth, width)
    const textPositionX = calculateTextXPosition(color, x, width)
    const textPositionY = y + height - 10
    const className = getClassName(note)
    const fontSize = isWhiteKey ? '1rem' : '0.75rem'
    const textClass = isWhiteKey ? 'white-key-text' : 'black-key-text'
    const textAnchor = 'middle'
    const dominantBaseline = 'middle'

    return (
      <g data-testid='piano-key'>
        <rect
          x={rectPositionX}
          y={y}
          width={rectWidth}
          height={height}
          className={className}
          rx={radius}
          onClick={() => onKeyClick(note)}
        />
        {state.showNoteNames && (
          <text
            x={textPositionX}
            y={textPositionY}
            textAnchor={textAnchor}
            dominantBaseline={dominantBaseline}
            className={textClass}
            fontSize={fontSize}
          >
            {note.nameNoOctave}
          </text>
        )}
      </g>
    )
  }

  const getClassName = (note: Note) => {
    switch (state.noteStatuses[note.fullName]) {
      case 'CORRECT':
        return 'green-key'
      case 'MISSED_CORRECT':
        return 'orange-key'
      default:
        return note.accidental ? 'black-key' : 'white-key'
    }
  }

  return generateKeySVG(color, radius, padding, gridWidth, note)
}

export default PianoKey
