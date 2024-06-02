import React from 'react'
import { act, renderHook } from '@testing-library/react'
import { Provider } from 'react-redux'

import { useGame } from '@/hooks/useGame'
import { INITIAL_SCORE } from '@/utils/GameConstants'
import { store } from '@/redux/store'

describe('useGame', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  )

  it('should return initial game state', () => {
    const { result } = renderHook(() => useGame(), { wrapper })
    const { isGameInProgress, score, currentNote, currentScale, notes, scales } =
      result.current.state

    expect(isGameInProgress).toBe(true)
    expect(score).toBe(INITIAL_SCORE)
    expect(currentNote).toBeDefined()
    expect(currentScale).toBeDefined()
    expect(notes).toBeDefined()
    expect(scales).toBeDefined()
  })

  it('should be able to toggle note names', () => {
    const { result } = renderHook(() => useGame(), { wrapper })

    act(() => {
      result.current.handleShowNoteNames()
    })

    expect(result.current.state.showNoteNames).toBe(true)

    act(() => {
      result.current.handleShowNoteNames()
    })

    expect(result.current.state.showNoteNames).toBe(false)
  })
})
