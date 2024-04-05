'use client'
import React from 'react'

import { GameContext } from '@/contexts/GameContext'

type Props = {
  score: number
  scaleName: string
  triesLeft: number
}

const GameInfo: React.FC<Props> = ({ score, scaleName, triesLeft }) => {
  const { dispatch } = React.useContext(GameContext) || {}

  return (
    <div
      className='flex justify-evenly bg-menu-blue p-6 m-6'
      style={{ border: '6px solid #1e313d' }}
    >
      <div className='space-y-3'>
        <h1>
          Current Scale: <span className='text-orange-400'>{scaleName}</span>
        </h1>
        <h1>Score: {score}</h1>
      </div>

      <div className='space-y-3'>
        <div className='inline-flex'>
          <label htmlFor='noteNamesToggle' className='text-white font-bold text-2xl'>
            Show Note Names:
          </label>
          <input
            type='checkbox'
            id='noteNamesToggle'
            className='w-6 ml-2'
            onChange={(e) =>
              dispatch && dispatch({ type: 'SHOW_NOTE_NAMES', payload: e.target.checked })
            }
          />
        </div>
        <h1>Tries Left: {triesLeft}</h1>
      </div>
    </div>
  )
}

export default GameInfo
