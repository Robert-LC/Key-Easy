import React from 'react'

import { Note } from '@/types/Note'
import { playSound } from '@/services/SoundService'
import { useGame } from '@/hooks/useGame'
import { WHITE_KEY_COLOR } from '@/utils/GameConstants'

type Props = {
  //visual
  x: number
  y: number
  width: number
  height: number
  radius: number
  padding?: number
  gridWidth?: number
  color: 'BLACK' | 'WHITE'

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
  padding,
  color,
  gridWidth,
  note
}) => {
  const { handleNoteClick, state } = useGame()

  const onKeyClick = (note: Note) => {
    playSound(note.fullName, 0.5)
    handleNoteClick(note)
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

  padding = padding || 0
  gridWidth = gridWidth || 0

  if (color == WHITE_KEY_COLOR) {
    return (
      <g data-testid='piano-key'>
        <rect
          x={x * width + padding / 2}
          y={y}
          width={width - padding}
          height={height}
          className={getClassName(note)}
          rx={radius}
          onClick={() => onKeyClick(note)}
        />
        {state.showNoteNames && (
          <text
            x={x * width + width / 2}
            y={y + height - 10}
            textAnchor='middle'
            dominantBaseline='middle'
            className='white-key-text'
            fontSize='1rem'
          >
            {note.nameNoOctave}
          </text>
        )}
      </g>
    )
  } else {
    x = (x + 1) * gridWidth - width / 2
    return (
      <g data-testid='piano-key'>
        <rect
          x={x}
          y={y}
          width={width - padding}
          height={height}
          className={getClassName(note)}
          rx={radius}
          onClick={() => onKeyClick(note)}
        />
        {state.showNoteNames && (
          <text
            x={x + width / 2}
            y={y + height - 10}
            textAnchor='middle'
            dominantBaseline='middle'
            className='black-key-text'
            fontSize='0.75rem'
          >
            {note.nameNoOctave}
          </text>
        )}
      </g>
    )
  }
}

export default PianoKey
