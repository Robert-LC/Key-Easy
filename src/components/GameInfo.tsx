'use client'
import React from 'react'

import { Note } from '@/types/Note'
import { useGame } from '@/hooks/useGame'

const MAX_NOTES = 7

const GameInfo = () => {
  const { handleShowNoteNames, state } = useGame()
  const currentScale = state.currentScale

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
    <div>
      <div
        className='flex justify-evenly bg-menu-blue p-6'
        style={{ border: '0.6em solid #1e313d' }}
      >
        <div className='space-y-4'>
          <span className='text-white text-3xl font-bold'>
            Current Scale: <span className='text-orange-400'>{currentScale?.name}</span>
          </span>
          <p className='text-white text-3xl font-bold'>Score: {state.score}</p>
        </div>

        <div className='space-y-4'>
          <div className='inline-flex'>
            <label htmlFor='noteNamesToggle' className='text-white font-bold text-3xl'>
              Show Note Names:
            </label>
            <input
              type='checkbox'
              id='noteNamesToggle'
              className='w-6 ml-2'
              onChange={handleShowNoteNames}
            />
          </div>
          <p className='text-white text-2xl font-bold'>Tries Left: {state.triesLeft}</p>
        </div>
      </div>
      <div className='flex justify-evenly'>
        <span className='text-white text-6xl font-bold'>
          Click the <span className='text-orange-400'>{calculateScalePosition(state.notes)}</span>{' '}
          Note
        </span>
      </div>
    </div>
  )
}

export default GameInfo
