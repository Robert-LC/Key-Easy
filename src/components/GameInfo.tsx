import React from 'react'

type Props = {
  score: number
  scaleName: string
  showNoteNames: boolean
  triesLeft: number
}

const GameInfo: React.FC<Props> = ({ score, scaleName, showNoteNames, triesLeft }) => {
  return (
    <div>
      <h1>
        Current Scale: <p>{scaleName}</p>
      </h1>
      <h1>
        Score: <p>{score}</p>
      </h1>
      <div>
        <label htmlFor='noteNamesToggle'>Show Note Names</label>
        <input type='checkbox' id='noteNamesToggle' checked={showNoteNames} />
      </div>
      <h3>
        Tries Left: <p>{triesLeft}</p>
      </h3>
    </div>
  )
}

export default GameInfo
