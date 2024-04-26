import GameInfo from '@/components/GameInfo'

import Piano from '../components/Piano/Piano'
import StoreProvider from './StoreProvider'

const Home = () => {
  return (
    <div className='flex flex-col justify-evenly h-full p-10'>
      <StoreProvider>
        <GameInfo />
        <Piano />
      </StoreProvider>
    </div>
  )
}

export default Home
