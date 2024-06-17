'use client'
import { useEffect, useState } from 'react'
import { Provider } from 'react-redux'

import GameInfo from '@/components/GameInfo'
import { store } from '@/redux/store'
import GameOverModal from '@/components/GameOverModal/GameOverModal'

import Piano from '../components/Piano/Piano'

const Home = () => {
  const [isLoading, setIsLoading] = useState(true)

  // Hack for hydration errors since state is is set by random numbers
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1)
  }, [])

  return (
    <div className='m-4'>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Provider store={store}>
          <GameOverModal />
          <GameInfo />
          <Piano />
        </Provider>
      )}
    </div>
  )
}

export default Home
