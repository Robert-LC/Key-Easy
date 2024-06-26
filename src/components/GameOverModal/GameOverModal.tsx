import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'

import { useAppSelector } from '@/redux/hooks'

import PlayAgainButton from './PlayAgainButton'

const GameOverModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const isGameInProgress = useAppSelector((state) => state.game.isGameInProgress)

  useEffect(() => {
    if (!isGameInProgress) {
      setModalIsOpen(true)
    }
  }, [isGameInProgress])

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      shouldCloseOnOverlayClick={false}
      contentLabel='Game Over Popup'
      className='bg-menu-blue rounded-2xl w-1/2 h-1/2 focus:outline-none p-20 flex items-center justify-center'
      overlayClassName='fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center'
    >
      <div className='flex flex-col justify-between h-full w-full'>
        <h1 className='text-white text-5xl text-center'>Game Over</h1>
        <div className='flex justify-around'>
          <button
            onClick={() => setModalIsOpen(false)}
            className='mt-2 bg-red-500 text-white rounded px-4 py-2'
          >
            Close
          </button>
          <PlayAgainButton onPlayAgain={() => setModalIsOpen(false)} />
        </div>
      </div>
    </Modal>
  )
}

export default GameOverModal
