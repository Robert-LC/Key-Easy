import React from 'react'

const Footer: React.FC = () => {
  return (
    <div className='flex justify-between border-t-8  text-white p-6'>
      <h3>KeyEasy by Robert LoCicero</h3>
      <h3>
        <a href='https://github.com/Robert-LC/KeyEasy' target='_blank' rel='noopener noreferrer'>
          GitHub
        </a>
      </h3>
    </div>
  )
}

export default Footer
