import React from 'react'
import { fireEvent, screen } from '@testing-library/react'

import PianoKey from '@/components/Piano/PianoKey/PianoKey'
import { playSound } from '@/services/SoundService'
import { Note } from '@/types/Note'
import { renderWithReduxProvider } from '@/utils/ComponentTestUtils'
import { useGame } from '@/hooks/useGame'
import { ScaleMode } from '@/types/Types'
import { DEFAULT_VOLUME } from '@/utils/GameConstants'
import { createNoteFromTonal } from '@/utils/NoteUtils'

jest.mock('@/services/SoundService', () => ({
  playSound: jest.fn()
}))

jest.mock('@/hooks/useGame')
const mockUseGame = useGame as jest.MockedFunction<typeof useGame>

describe('PianoKey component', () => {
  const naturalNote = createNoteFromTonal('C4')
  const accidentalNote = createNoteFromTonal('Ab4')
  const correctNote = createNoteFromTonal('B4')
  const missedCorrectNote = createNoteFromTonal('D4')

  beforeEach(() => {
    mockUseGame.mockReturnValue({
      handleNoteClick: jest.fn(),
      handleShowNoteNames: jest.fn(),
      handleResetGame: jest.fn(),
      state: {
        notes: [],
        scales: [],
        isGameInProgress: true,
        mode: ScaleMode.Major,
        showNoteNames: true,
        score: 0,
        triesLeft: 3,
        noteStatuses: {
          [correctNote.frequency]: 'CORRECT',
          [missedCorrectNote.frequency]: 'MISSED_CORRECT'
        }
      }
    })
  })

  it('renders the component correctly', () => {
    renderKey(naturalNote)

    expect(screen.getByTestId('piano-key-rect')).toBeInTheDocument()
  })

  it('renders a black key when there is an accidental', () => {
    renderKey(accidentalNote)

    expect(screen.getByTestId('piano-key-rect')).toHaveClass('black-key')
  })

  it('renders a white key when the note is a natural', () => {
    renderKey(naturalNote)

    expect(screen.getByTestId('piano-key-rect')).toHaveClass('white-key')
  })

  it('renders the key as green when the note is correct', () => {
    renderKey(correctNote)

    expect(screen.getByTestId('piano-key-rect')).toHaveClass('green-key')
  })

  it('renders the correct key as orange when the correct key wasnt clicked', () => {
    renderKey(missedCorrectNote)

    expect(screen.getByTestId('piano-key-rect')).toHaveClass('orange-key')
  })

  it('should play the correct piano sound when clicked', () => {
    renderKey(naturalNote)
    const pianoKey = screen.getByTestId('piano-key-rect')

    fireEvent.click(pianoKey)

    expect(playSound).toHaveBeenCalledTimes(1)
    expect(playSound).toHaveBeenCalledWith(naturalNote.fullName, DEFAULT_VOLUME)
  })
})

// Wraps PianoKey in SVG for testing, as it's not a child of the SVG wrapped Piano Component in this test
const renderKey = (note: Note) => {
  return renderWithReduxProvider(
    <svg>
      <PianoKey x={0} y={0} note={note} />
    </svg>
  )
}
