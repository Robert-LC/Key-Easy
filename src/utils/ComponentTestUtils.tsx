import { render } from '@testing-library/react'

import StoreProvider from '@/app/StoreProvider'

export const renderWithProvider = (component: React.JSX.Element) => {
  return render(<StoreProvider>{component}</StoreProvider>)
}
