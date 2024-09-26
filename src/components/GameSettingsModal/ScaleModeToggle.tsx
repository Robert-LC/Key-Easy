import React, { useState } from 'react'

import { ScaleMode } from '@/types/Types'

type Props = {
  onScaleChange: (mode: ScaleMode) => void
  value: null | ScaleMode
}

const ScaleModeToggle = ({ onScaleChange, value }: Props) => {
  const labels = {
    left: {
      title: 'Major',
      value: ScaleMode.Major
    },
    center: {
      title: 'Both',
      value: ScaleMode.Both
    },
    right: {
      title: 'Minor',
      value: ScaleMode.Minor
    }
  }

  const [scaleMode, setScaleMode] = useState<ScaleMode | null>(value)

  const handleOptionChange = (scaleMode: ScaleMode) => {
    // Call parent setter and return scale Mode in this setter to sync parent and child states
    setScaleMode(() => {
      onScaleChange(scaleMode)
      return scaleMode
    })
  }

  return (
    <div className='flex flex-col gap-4'>
      <h1>Scale Mode</h1>
      <div className='flex items-center justify-center space-x-2 border border-purple-500 rounded shadow-sm w-60 h-14'>
        <div className={`text-purple-700`}>
          <input
            defaultChecked
            name='map-switch'
            id='left'
            type='radio'
            value='left'
            className='hidden'
          />
          <label
            className='left-label cursor-pointer'
            htmlFor='left'
            onClick={() => handleOptionChange(ScaleMode.Major)}
          >
            <h4>{labels.left.title}</h4>
          </label>
        </div>

        <div className='text-purple-700'>
          <input name='map-switch' id='center' type='radio' value='center' className='hidden' />
          <label
            className='center-label cursor-pointer'
            htmlFor='center'
            onClick={() => handleOptionChange(ScaleMode.Both)}
          >
            <h4>{labels.center.title}</h4>
          </label>
        </div>

        <div className='text-purple-700'>
          <input name='map-switch' id='right' type='radio' value='right' className='hidden' />
          <label
            className='right-label cursor-pointer'
            htmlFor='right'
            onClick={() => handleOptionChange(ScaleMode.Minor)}
          >
            <h4>{labels.right.title}</h4>
          </label>
        </div>
      </div>

      <div>Selected Option: {scaleMode}</div>
    </div>
  )
}
export default ScaleModeToggle
