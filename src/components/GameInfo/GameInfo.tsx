'use client'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'

import { Note } from '@/types/Note'
import { useGame } from '@/hooks/useGame'

import GameSettingsModal from '../GameSettingsModal/GameSettingsModal'

const MAX_NOTES = 7

const GameInfo = () => {
  const { handleShowNoteNames, state } = useGame()
  const currentScale = state.currentScale

  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)

  const toggleSettingsModal = () => {
    setIsSettingsModalOpen(!isSettingsModalOpen)
  }

  const calculateScalePosition = (notes?: Note[]) => {
    if (!notes) {
      return ''
    }

    if (notes.length === MAX_NOTES) {
      return calculateNumberSuffix(1)
    }

    // Subtract the number of notes from the max number of notes + 1 to get the position
    return calculateNumberSuffix(MAX_NOTES - notes.length)
  }

  const calculateNumberSuffix = (number: number): string => {
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

  const calculateMaxScore = (): number => {
    return MAX_NOTES * (state.scales.length + 1)
  }

  return (
    <div>
      <div
        className='flex justify-evenly bg-menu-blue p-4 m-4 shadow-sm'
        style={{ border: '0.6em solid #1e313d' }}
      >
        <GameSettingsModal isOpen={isSettingsModalOpen} toggleModal={toggleSettingsModal} />
        <button role='button' className='h-10' onClick={toggleSettingsModal}>
          <FontAwesomeIcon
            icon={faGear}
            size='2x'
            className='text-white hover:text-black transition-colors duration-20'
          />
        </button>
        <div className='flex justify-around w-full mr-20'>
          <div className='space-y-5'>
            <span className='text-white text-4xl font-bold'>
              Current Scale: <span className='text-orange-400'>{currentScale?.name}</span>
            </span>
            <p className='text-white text-4xl font-bold'>
              Score: {state.score}/{calculateMaxScore()}
            </p>
          </div>
          <div className='space-y-5'>
            <div className='inline-flex'>
              <label htmlFor='noteNamesToggle' className='text-white font-bold text-4xl'>
                Show Note Names:
              </label>
              <input
                type='checkbox'
                id='noteNamesToggle'
                className='w-6 ml-2 mt-1'
                onChange={handleShowNoteNames}
              />
            </div>
            <p className='text-white text-4xl font-bold'>Tries Left: {state.triesLeft}</p>
          </div>
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
