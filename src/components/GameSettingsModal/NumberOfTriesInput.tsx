import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

const NumberOfTriesInput = () => {
  const defaultTries = 3
  const maxTries = 7
  const minTries = 1

  const [tries, setTries] = useState(defaultTries)

  const handleIncrement = () => {
    setTries((prevTries) => Math.min(prevTries + 1, maxTries))
  }

  const handleDecrement = () => {
    setTries((prevTries) => Math.max(prevTries - 1, minTries))
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
