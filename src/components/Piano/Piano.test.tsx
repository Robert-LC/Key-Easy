import { fireEvent, render, screen, within } from '@testing-library/react'

import { NUM_OF_KEYS } from '@/utils/GameConstants'
import StoreProvider from '@/app/StoreProvider'

import Piano from './Piano'
import GameInfo from '../GameInfo'

const renderWithProvider = (component: React.JSX.Element) => {
  return render(<StoreProvider>{component}</StoreProvider>)
}

describe('Piano', () => {
  it('renders without crashing', () => {
    renderWithProvider(<Piano />)
  })

  it('renders correct number of piano keys', () => {
    renderWithProvider(<Piano />)
    const keys = screen.getAllByTestId('piano-key')
    expect(keys.length).toBe(NUM_OF_KEYS)
  })

  it('shows note names on piano keys when checkbox in GameInfo is checked', () => {
    renderWithProvider(
      <>
        <GameInfo />
        <Piano />
      </>
    )

    const checkbox = screen.getByLabelText('noteNamesToggle')
    fireEvent.click(checkbox)

    const keys = screen.getAllByTestId('piano-key')
    keys.forEach((key) => {
      const letter = within(key).getByText(/[A-Z](b|#)?/)
      expect(letter).toBeInTheDocument()
    })
  })
})
