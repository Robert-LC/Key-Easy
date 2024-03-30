import { GameProvider } from '@/contexts/GameContext'

import Piano from '../components/Piano/Piano'
import { notes } from '../components/Piano/NoteType'

const Home = () => {
  return (
    <GameProvider>
      <Piano notes={notes} />
    </GameProvider>
  )
}

export default Home
