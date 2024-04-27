'use client'
import React from 'react'

type Props = {
  y: number
  width: number
  height: number
  radius: number
  shadowHeight: number
}

const Panel: React.FC<Props> = ({ y, width, height, radius, shadowHeight }) => {
  return (
    <g className='panel'>
      <rect className='panel-shadow' width={width} height={shadowHeight} y={radius - 1} />
      <rect width={width} height={height} y={y} rx={radius} />
    </g>
  )
}

export default Panel
