import React, { useContext } from 'react'
import styled from 'styled-components'

import { Note } from '@/types/Note'
import { GameContext } from '@/contexts/GameContext'
import { playSound } from '@/services/SoundService'

type Props = {
  note: Note
}

const BlackKey = styled.button`
  width: 78px;
  height: 260px;
  position: absolute;
  margin: 1px;
  margin-left: -40px;
  background: black;
  z-index: 2;

  color: white;
  font-family: sans-serif;
  font-weight: bold;
  font-size: 40px;
  display: inline-flex;
  flex-wrap: wrap;
  align-content: flex-end;
  justify-content: center;

  &:hover {
    filter: brightness(85%);
  }
`
const WhiteKey = styled.button`
  width: 110px;
  height: 400px;
  margin: 1px;
  background: #ededed;
  border: 1px solid black;
  box-shadow: 2px 5px;
  z-index: 1;

  font-family: sans-serif;
  font-weight: bold;
  font-size: 40px;
  display: inline-flex;
  flex-wrap: wrap;
  align-content: flex-end;
  justify-content: center;

  &:hover {
    filter: brightness(90%);
  }
`

const PianoKey: React.FC<Props> = ({ note }) => {
  const context = useContext(GameContext)

  const handleClick = () => {
    playSound(note.fullName, 0.5)
  }

  return note.accidental === '' ? (
    <WhiteKey onClick={handleClick}> {context?.state.showNoteNames && note.nameNoOctave} </WhiteKey>
  ) : (
    <BlackKey onClick={handleClick}> {context?.state.showNoteNames && note.nameNoOctave} </BlackKey>
  )
}

export default PianoKey
