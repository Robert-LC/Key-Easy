'use client'
import { useEffect, useRef, useState } from 'react'
import { Provider } from 'react-redux'

import { AppStore, makeStore } from '@/redux/store'
import { initializeGame } from '@/redux/features/gameSlice'
import { generateInitialGameState } from '@/services/GameService'

/**
 * A provider that when wrapped around components, provides access to the Redux store.
 */
export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<AppStore>()
  const [isStoreReady, setStoreReady] = useState(false)

  useEffect(() => {
    if (!storeRef.current) {
      // Create the store instance the first time this renders
      storeRef.current = makeStore()
      storeRef.current.dispatch(initializeGame(generateInitialGameState()))
      setStoreReady(true) // Trigger a re-render
    }
  }, [])

  if (!isStoreReady) {
    return null
  }

  return <Provider store={storeRef.current!}>{children}</Provider>
}

export default StoreProvider
