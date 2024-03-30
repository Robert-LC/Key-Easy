import { GameProvider } from '@/contexts/GameContext'
import GameInfo from '@/components/GameInfo'

import Piano from '../components/Piano/Piano'
import { notes } from '../components/Piano/NoteType'

const Home = () => {
  return (
    <GameProvider>
      <div>
        <GameInfo score={0} scaleName='Major' showNoteNames={true} triesLeft={3} />
        <Piano notes={notes} />
      </div>
    </GameProvider>
  )
}

export default Home
