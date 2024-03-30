import React from 'react'

const Footer: React.FC = () => {
  return (
    <div className='flex justify-between border-t-4  text-white p-6 bg-menu-blue'>
      <h1>KeyEasy by Robert LoCicero</h1>
      <h1>
        <a href='https://github.com/Robert-LC/Key-Easy' target='_blank' rel='noopener noreferrer'>
          GitHub
        </a>
      </h1>
    </div>
  )
}

export default Footer
