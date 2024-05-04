import { render, screen } from '@testing-library/react'

import Home from '@/app/page'

describe('Home', () => {
  it('should render the Piano', () => {
    render(<Home />)

    const piano = screen.getByTestId('piano')
    expect(piano).toBeInTheDocument()
  })

  it('should render the GameInfo', () => {
    render(<Home />)

    const gameInfo = screen.getByText('Current Scale:')
    expect(gameInfo).toBeInTheDocument()
  })
})
