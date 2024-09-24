import React from 'react'
import Modal from 'react-modal'

import ScaleModeToggle from './ScaleModeToggle'

type Props = {
  isOpen: boolean
  toggleModal: () => void
}

const GameSettingsModal = ({ isOpen, toggleModal }: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={toggleModal}
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
      contentLabel='Game Settings Popup'
      className='bg-menu-blue rounded-2xl w-1/2 h-1/2 focus:outline-none p-20 flex items-center justify-center'
      overlayClassName='fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center'
    >
      <div className='flex flex-col justify-between h-full w-full'>
        <h1 className='text-white text-5xl text-center'>Game Settings</h1>
        <div>
          <ScaleModeToggle />
        </div>
        <div className='flex justify-around'>
          <button onClick={toggleModal} className='mt-2 bg-red-500 text-white rounded px-4 py-2'>
            Close
          </button>
          <button onClick={toggleModal} className='mt-2 bg-green-500 text-white rounded px-4 py-2'>
            Save
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default GameSettingsModal
