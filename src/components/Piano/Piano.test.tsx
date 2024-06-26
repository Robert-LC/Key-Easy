import { fireEvent, screen, within } from '@testing-library/react'

import { NUM_OF_KEYS } from '@/utils/GameConstants'
import { renderWithReduxProvider } from '@/utils/ComponentTestUtils'

import Piano from './Piano'
import GameInfo from '../GameInfo/GameInfo'

describe('Piano component', () => {
  it('renders component correctly', () => {
    renderWithReduxProvider(<Piano />)
    expect(screen.getByTestId('piano')).toBeInTheDocument()
  })

  it('renders correct number of piano keys', () => {
    renderWithReduxProvider(<Piano />)
    const keys = screen.getAllByTestId('piano-key')
    expect(keys.length).toBe(NUM_OF_KEYS)
  })

  it('shows note names on piano keys when checkbox in GameInfo is checked', () => {
    renderWithReduxProvider(
      <>
        <GameInfo />
        <Piano />
      </>
    )

    const checkbox = screen.getByLabelText('Show Note Names:')
    fireEvent.click(checkbox)

    const keys = screen.getAllByTestId('piano-key')
    keys.forEach((key) => {
      const letter = within(key).getByText(/[A-Z](b|#)?/)
      expect(letter).toBeInTheDocument()
    })
  })
})
