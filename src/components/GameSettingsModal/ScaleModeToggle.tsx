import React, { useState } from 'react'

import { ScaleMode } from '@/types/Types'

const ScaleModeToggle = () => {
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

  const [switchPosition, setSwitchPosition] = useState<ScaleMode | null>(ScaleMode.Major)
  const handleOptionChange = (scaleMode: ScaleMode) => {
    setSwitchPosition(scaleMode)
  }

  return (
    <>
      <h1>Scale Mode</h1>
      <div className='flex items-center justify-center space-x-2 border border-purple-500 rounded shadow-sm w-60 h-14'>
        <div className={`text-purple-700`}>
          <input
            defaultChecked
            name='map-switch'
            id='left'
            type='radio'
            value='left'
            onChange={() => handleOptionChange(ScaleMode.Major)}
            className='hidden'
          />
          <label
            className='left-label'
            htmlFor='left'
            onClick={() => handleOptionChange(ScaleMode.Major)}
          >
            <h4>{labels.left.title}</h4>
          </label>
        </div>

        <div className='text-purple-700'>
          <input
            name='map-switch'
            id='center'
            type='radio'
            value='center'
            onChange={() => handleOptionChange(ScaleMode.Both)}
            className='hidden'
          />
          <label
            className='center-label'
            htmlFor='center'
            onClick={() => handleOptionChange(ScaleMode.Both)}
          >
            <h4>{labels.center.title}</h4>
          </label>
        </div>

        <div className='text-purple-700'>
          <input
            name='map-switch'
            id='right'
            type='radio'
            value='right'
            onChange={() => handleOptionChange(ScaleMode.Minor)}
            className='hidden'
          />
          <label
            className='right-label'
            htmlFor='right'
            onClick={() => handleOptionChange(ScaleMode.Minor)}
          >
            <h4>{labels.right.title}</h4>
          </label>
        </div>
      </div>

      <div>Selected Option: {switchPosition}</div>
    </>
  )
}

// const [animation, setAnimation] = useState(null)

// const getSwitchAnimation = (value: ScaleMode) => {
//   let newAnimation = null
//   switch (value) {
//     case ScaleMode.Both:
//       newAnimation = switchPosition === Position.Left ? 'left-to-center' : 'right-to-center'
//       break
//     case ScaleMode.Minor:
//       newAnimation = switchPosition === Position.Center ? 'center-to-right' : 'left-to-right'
//       break
//     case ScaleMode.Major:
//       newAnimation = switchPosition === Position.Center ? 'center-to-left' : 'right-to-left'
//       break
//   }

//   setSwitchPosition(ScaleModeToPosition[value])
//   setAnimation(newAnimation)
// }
export default ScaleModeToggle
