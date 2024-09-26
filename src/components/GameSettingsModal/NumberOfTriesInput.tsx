import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

type Props = {
  onTriesChange: (tries: number) => void
  value: number
}

const NumberOfTriesInput = ({ onTriesChange, value }: Props) => {
  const maxTries = 7
  const minTries = 1

  const [tries, setTries] = useState(value)

  const handleIncrement = () => {
    // Call parent setter and return scale Mode in this setter to sync parent and child states
    setTries((prevTries) => {
      const newTries = Math.min(prevTries + 1, maxTries)
      onTriesChange(newTries)
      return newTries
    })
  }

  const handleDecrement = () => {
    setTries((prevTries) => {
      const newTries = Math.max(prevTries - 1, minTries)
      onTriesChange(newTries)
      return newTries
    })
  }

  return (
    <div className='flex flex-col gap-4'>
      <h1># of Tries</h1>
      <div className='flex justify-around'>
        <input
          type='text'
          value={tries}
          readOnly
          className='focus:outline-none border border-gray-300 p-4 rounded-md w-2/3'
        />

        <div className='flex justify-center'>
          <button
            onClick={handleIncrement}
            className='border-none bg-green-500 hover:bg-green-600 cursor-pointer rounded-md p-2'
          >
            <FontAwesomeIcon icon={faPlus} size='lg' />
          </button>
        </div>

        <div className='flex justify-center'>
          <button
            onClick={handleDecrement}
            className='border-none bg-red-500 hover:bg-red-600 cursor-pointer rounded-md p-2'
          >
            <FontAwesomeIcon icon={faMinus} size='lg' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default NumberOfTriesInput
