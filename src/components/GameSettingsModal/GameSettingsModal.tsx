import React, { useState } from 'react'
import Modal from 'react-modal'

import { useGame } from '@/hooks/useGame'

import ScaleModeToggle from './ScaleModeToggle'
import NumberOfTriesInput from './NumberOfTriesInput'

type Props = {
  isOpen: boolean
  toggleModal: () => void
}

const GameSettingsModal = ({ isOpen, toggleModal }: Props) => {
  const { handleUpdateSettings, state } = useGame()

  // initialize GameSettings modal with the current state in redux
  const [triesPerNote, setTriesPerNote] = useState(state.triesPerNote)
  const [mode, setMode] = useState(state.mode)

  // On Save button click, take the new values from UI and update redux state
  const handleSave = () => {
    handleUpdateSettings({ triesPerNote, mode })
    toggleModal()
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={toggleModal}
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
      contentLabel='Game Settings Popup'
      className='bg-menu-blue rounded-2xl w-1/2 h-1/2 focus:outline-none p-16 flex items-center justify-center'
      overlayClassName='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center'
    >
      <div className='flex flex-col justify-between h-full w-full gap-y-2'>
        <h1 className='text-white text-5xl text-center'>Game Settings</h1>
        <em className='text-white text-lg text-center'>
          Saving new settings will restart the current game
        </em>
        <div className='flex justify-between'>
          <ScaleModeToggle onScaleChange={setMode} value={state.mode} />
          <NumberOfTriesInput onTriesChange={setTriesPerNote} value={state.triesPerNote} />
        </div>
        <div className='flex justify-around'>
          <button onClick={toggleModal} className='mt-2 bg-red-500 text-white rounded px-4 py-2'>
            Cancel
          </button>
          <button onClick={handleSave} className='mt-2 bg-green-500 text-white rounded px-4 py-2'>
            Save
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default GameSettingsModal
