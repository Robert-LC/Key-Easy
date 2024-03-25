'use client'
import React from 'react'
import styled from 'styled-components'

import PianoKey from './PianoKey/PianoKey'
import { NoteType } from './NoteType'

type Props = {
  notes: NoteType[]
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
const Piano: React.FC<Props> = ({ notes }) => (
  <Wrapper>
    <div>
      {notes.map((element: NoteType) => (
        <PianoKey key={element.note} note={element.note} color={element.color} />
      ))}
    </div>
  </Wrapper>
)

export default Piano
