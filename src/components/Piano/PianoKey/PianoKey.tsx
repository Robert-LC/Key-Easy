import React from 'react'
import styled from 'styled-components'

import { Note } from '@/types/Note'

type Props = {
  note: Note
}

const BlackKey = styled.button`
  width: 80px;
  height: 260px;
  position: absolute;
  margin: 1px;
  margin-left: -40px;
  background: black;

  :active {
    background: #333;
  }
`
const WhiteKey = styled.button`
  width: 120px;
  height: 400px;
  margin: 1px;
  background: #ededed;
  border: 1px solid black;
  box-shadow: 2px 5px;

  :active {
    background: #ccc;
  }
`

const PianoKey: React.FC<Props> = ({ note }) => {
  return note.accidentalType === 'Natural' ? <WhiteKey /> : <BlackKey />
}

export default PianoKey
