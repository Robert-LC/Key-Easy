import { GameProvider } from '@/contexts/GameContext'
import GameInfo from '@/components/GameInfo'

import Piano from '../components/Piano/Piano'

const Home = () => {
  return (
    <GameProvider>
      <div className='flex flex-col h-full'>
        <GameInfo />
        <Piano />
      </div>
    </GameProvider>
  )
}

export default Home
