import { screen, waitFor } from '@testing-library/react'

import { renderWithReduxProvider } from '@/utils/ComponentTestUtils'
import Home from '@/app/page'

describe('Home', () => {
  it('should render the Piano', async () => {
    renderWithReduxProvider(<Home />)
    //wait for the component to render

    await waitFor(() => {
      const piano = screen.getByTestId('piano')
      expect(piano).toBeInTheDocument()
    })
  })

  it('should render the GameInfo', async () => {
    renderWithReduxProvider(<Home />)

    await waitFor(() => {
      const gameInfo = screen.getByText('Current Scale:')
      expect(gameInfo).toBeInTheDocument()
    })
  })
})
