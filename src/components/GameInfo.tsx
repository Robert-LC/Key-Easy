'use client'
import React from 'react'

import { GameContext } from '@/contexts/GameContext'
import { Note } from '@/types/Note'

const MAX_NOTES = 7

const GameInfo = () => {
  const { state, dispatch } = React.useContext(GameContext) || {}
  const currentScale = state?.currentScale

  const calculateScalePosition = (notes?: Note[]) => {
    if (!notes) {
      return ''
    }

    if (notes.length === MAX_NOTES) {
      return numberSuffix(1)
    }

    // Subtract the number of notes from the max number of notes + 1 to get the position
    return numberSuffix(MAX_NOTES - notes.length)
  }

  const numberSuffix = (number: number): string => {
    switch (number) {
      case 1:
        return '1st'
      case 2:
        return '2nd'
      case 3:
        return '3rd'
      default:
        return `${number}th`
    }
  }

  return (
    <>
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
      <div className='flex justify-evenly'>
        <h1 className='text-5xl'>
          Click the <span className='text-orange-400'>{calculateScalePosition(state?.notes)}</span>{' '}
          Note
        </h1>
      </div>
    </>
  )
}

export default GameInfo
