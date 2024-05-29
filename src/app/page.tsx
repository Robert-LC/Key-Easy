'use client'
import { Provider } from 'react-redux'

import GameInfo from '@/components/GameInfo'
import { store } from '@/redux/store'

import Piano from '../components/Piano/Piano'

const Home = () => {
  return (
    <div className='m-4'>
      <Provider store={store}>
        <GameInfo />
        <Piano />
      </Provider>
    </div>
  )
}

export default Home
