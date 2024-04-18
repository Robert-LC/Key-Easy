import React from 'react'
import styled from 'styled-components'

import { Note } from '@/types/Note'
import { playSound } from '@/services/SoundService'
import { useGame } from '@/hooks/useGame'

type Props = {
  note: Note
  isBlack: boolean
}

const Key = styled.button<Props>`
  width: ${(props) => (props.isBlack ? '78px' : '110px')};
  height: ${(props) => (props.isBlack ? '260px' : '400px')};
  position: ${(props) => (props.isBlack ? 'absolute' : 'static')};
  margin: 1px;
  margin-left: ${(props) => (props.isBlack ? '-40px' : '0')};
  z-index: ${(props) => (props.isBlack ? '2' : '1')};
  border: ${(props) => (props.isBlack ? 'none' : '1px solid black')};
  box-shadow: ${(props) => (props.isBlack ? 'none' : '2px 5px')};
  background-color: ${(props) => (props.isBlack ? 'black' : '#ededed')};

  color: ${(props) => (props.isBlack ? 'white' : 'black')};
  font-family: sans-serif;
  font-weight: bold;
  font-size: 40px;
  display: inline-flex;
  flex-wrap: wrap;
  align-content: flex-end;
  justify-content: center;

  &:hover {
    filter: ${(props) => (props.isBlack ? 'brightness(85%)' : 'brightness(90%)')};
  }
`
const PianoKey: React.FC<Props> = ({ note }) => {
  const { handleNoteClick, state } = useGame()

  const onKeyClick = (note: Note) => {
    playSound(note.fullName, 0.5)
    handleNoteClick(note)
  }

  return note.accidental === '' ? (
    <Key note={note} isBlack={false} onClick={() => onKeyClick(note)}>
      {state.showNoteNames && note.nameNoOctave}
    </Key>
  ) : (
    <Key note={note} isBlack={true} onClick={() => onKeyClick(note)}>
      {state.showNoteNames && note.nameNoOctave}
    </Key>
  )
}

export default PianoKey
