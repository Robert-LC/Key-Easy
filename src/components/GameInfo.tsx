'use client'
import React from 'react'

import { GameContext } from '@/contexts/GameContext'

const GameInfo = () => {
  const { state, dispatch } = React.useContext(GameContext) || {}
  const currentScale = state?.scales[state.scales.length - 1]
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const currentNote = state?.notes[0]

  return (
    <div
      className='flex justify-evenly bg-menu-blue p-6 m-6'
      style={{ border: '6px solid #1e313d' }}
    >
      <div className='space-y-3'>
        <h1>
          Current Scale: <span className='text-orange-400'>{currentScale?.name}</span>
        </h1>
        <h1>Score: {state?.score}</h1>
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
        <h1>Tries Left: {state?.triesLeft}</h1>
      </div>
    </div>
  )
}

export default GameInfo
