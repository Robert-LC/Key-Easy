import React from 'react'

import { useGame } from '@/hooks/useGame'

interface props {
  onPlayAgain: () => void
}

const PlayAgainButton = ({ onPlayAgain }: props) => {
  const { handleResetGame } = useGame()

  const handleClick = () => {
    handleResetGame()
    onPlayAgain()
  }

  return (
    <button onClick={handleClick} className='mt-2 bg-orange-300 rounded px-4 py-2 text-white'>
      Play Again
    </button>
  )
}

export default PlayAgainButton
