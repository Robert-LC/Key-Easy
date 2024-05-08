'use client'
import React from 'react'

import { PIANO_SVG_CONSTANTS } from '@/utils/GameConstants'

const { PANEL_HEIGHT, PANEL_SHADOW_HEIGHT, KEY_BORDER_RADIUS } = PIANO_SVG_CONSTANTS

type Props = {
  y: number
  width: number
}

const PianoPanel: React.FC<Props> = ({ y, width }) => {
  return (
    <g className='panel'>
      <rect
        className='panel-shadow'
        width={width}
        height={PANEL_SHADOW_HEIGHT}
        y={KEY_BORDER_RADIUS - 1}
      />
      <rect width={width} height={PANEL_HEIGHT} y={y} rx={KEY_BORDER_RADIUS} />
    </g>
  )
}

export default PianoPanel
