import { render } from '@testing-library/react'
import { Provider } from 'react-redux'

import { store } from '@/redux/store'

export const renderWithReduxProvider = (component: React.JSX.Element) => {
  return render(<Provider store={store}>{component}</Provider>)
}
