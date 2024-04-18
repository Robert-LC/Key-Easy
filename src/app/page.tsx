import GameInfo from '@/components/GameInfo'

import Piano from '../components/Piano/Piano'

const Home = () => {
  return (
    <div className='flex flex-col h-full'>
      <GameInfo />
      <Piano />
    </div>
  )
}

export default Home
