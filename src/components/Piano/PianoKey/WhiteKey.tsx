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
    <rect
      x={x * width + padding / 2}
      y={y}
      width={width - padding}
      height={height}
      className='white-key'
      rx={radius}
      onClick={() => onKeyClick(note)}
    />
  )
}

export default WhiteKey
