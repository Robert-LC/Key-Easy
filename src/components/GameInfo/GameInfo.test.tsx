import { fireEvent, screen } from '@testing-library/react'

import { renderWithReduxProvider } from '@/utils/ComponentTestUtils'

import GameInfo from './GameInfo'

describe('GameInfo', () => {
  test('renders the current scale name', () => {
    renderWithReduxProvider(<GameInfo />)
    const currentScaleName = screen.getByText(/Current Scale:/i)
    expect(currentScaleName).toBeInTheDocument()
  })

  test('renders the score', () => {
    renderWithReduxProvider(<GameInfo />)
    const score = screen.getByText(/Score:/i)
    expect(score).toBeInTheDocument()
  })

  test('renders the show note names toggle', () => {
    renderWithReduxProvider(<GameInfo />)
    const showNoteNamesToggle = screen.getByLabelText(/Show Note Names:/i)
    expect(showNoteNamesToggle).toBeInTheDocument()
  })

  test('renders the tries left', () => {
    renderWithReduxProvider(<GameInfo />)
    const triesLeft = screen.getByText(/Tries Left:/i)
    expect(triesLeft).toBeInTheDocument()
  })

  test('toggles the settings modal when the settings button is clicked', () => {
    renderWithReduxProvider(<GameInfo />)
    const settingsButton = screen.getByRole('button')
    fireEvent.click(settingsButton)
    const settingsModal = screen.getByRole('dialog', { name: /game settings/i })
    expect(settingsModal).toBeInTheDocument()
  })
})
