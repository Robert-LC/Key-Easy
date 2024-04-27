'use client'
import React from 'react'

import { useGame } from '@/hooks/useGame'
import { playSound } from '@/services/SoundService'
import { Note } from '@/types/Note'
import KeyProps from '@/types/KeyProps'

const WhiteKey: React.FC<KeyProps> = ({ x, y, width, height, radius, padding, note }) => {
  const { handleNoteClick, state } = useGame()
  const onKeyClick = (note: Note) => {
    playSound(note.fullName, 0.5)
    handleNoteClick(note)
    console.log(note.fullName)
  }
  padding = padding || 0

  return (
    <g>
      <rect
        x={x * width + padding / 2}
        y={y}
        width={width - padding}
        height={height}
        className='white-key'
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
}

export default WhiteKey
