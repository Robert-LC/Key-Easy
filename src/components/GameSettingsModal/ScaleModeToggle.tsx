import React, { useState } from 'react'

import { ScaleMode } from '@/types/Types'

type Props = {
  onScaleChange: (mode: ScaleMode) => void
  value: null | ScaleMode
}

const ScaleModeToggle = ({ onScaleChange, value }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [scaleMode, setScaleMode] = useState<ScaleMode | null>(value)

  const handleOptionChange = (scaleMode: ScaleMode) => {
    // Call parent setter and return scale Mode in this setter to sync parent and child states
    setScaleMode(() => {
      onScaleChange(scaleMode)
      return scaleMode
    })

    const btnIds = ['majorBtn', 'bothBtn', 'minorBtn']
    btnIds.forEach((btnId: string) => {
      document.getElementById(btnId)?.classList.remove('bg-purple-950', 'rounded-lg')
    })

    switch (scaleMode) {
      case ScaleMode.Major:
        document.getElementById('majorBtn')?.classList.add('bg-purple-950', 'rounded-lg')
        break
      case ScaleMode.Both:
        document.getElementById('bothBtn')?.classList.add('bg-purple-950', 'rounded-lg')
        break
      case ScaleMode.Minor:
        document.getElementById('minorBtn')?.classList.add('bg-purple-950', 'rounded-lg')
        break
    }
  }

  return (
    <div className='flex flex-col gap-4'>
      <h1>Scale Mode</h1>
      <div className='flex items-center justify-center space-x-2 border border-purple-500 rounded shadow-sm w-60 h-14'>
        <div id='majorBtn' className='text-purple-700 bg-purple-950 rounded-lg'>
          <input
            defaultChecked
            name='map-switch'
            id='left'
            type='radio'
            value='left'
            className='hidden'
          />
          <label
            className='cursor-pointer'
            htmlFor='left'
            onClick={() => handleOptionChange(ScaleMode.Major)}
          >
            <h4>Major</h4>
          </label>
        </div>

        <div id='bothBtn' className='text-purple-700'>
          <input name='map-switch' id='center' type='radio' value='center' className='hidden' />
          <label
            className='cursor-pointer'
            htmlFor='center'
            onClick={() => handleOptionChange(ScaleMode.Both)}
          >
            <h4>Both</h4>
          </label>
        </div>

        <div id='minorBtn' className='text-purple-700'>
          <input name='map-switch' id='right' type='radio' value='right' className='hidden' />
          <label
            className='cursor-pointer'
            htmlFor='right'
            onClick={() => handleOptionChange(ScaleMode.Minor)}
          >
            <h4>Minor</h4>
          </label>
        </div>
      </div>
    </div>
  )
}
export default ScaleModeToggle
