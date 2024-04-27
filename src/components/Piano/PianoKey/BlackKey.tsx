'use client'
import React from 'react'

import { useGame } from '@/hooks/useGame'
import { playSound } from '@/services/SoundService'
import { Note } from '@/types/Note'
import KeyProps from '@/types/KeyProps'

type BlackKeyProps = KeyProps & {
  gridWidth: number
}

const BlackKey: React.FC<BlackKeyProps> = ({
  x,
  y,
  width,
  height,
  radius,
  padding,
  note,
  gridWidth
}) => {
  const { handleNoteClick, state } = useGame()

  const onKeyClick = (note: Note) => {
    playSound(note.fullName, 0.5)
    handleNoteClick(note)
    console.log(note.fullName)
  }

  // Set so that key is in the middle of two white keys
  x = (x + 1) * gridWidth - width / 2
  padding = padding || 0

  return (
    <rect
      x={x}
      y={y}
      width={width - padding}
      height={height}
      className='black-key'
      rx={radius}
      onClick={() => onKeyClick(note)}
    />
  )
}

export default BlackKey