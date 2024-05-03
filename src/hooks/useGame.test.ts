import { renderHook, act } from '@testing-library/react-hooks'
import { useGame } from './useGame'
import { Note } from '@/types/Note'
import { Provider } from 'react-redux';

describe('useGame', () => {
  const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>

  it('should handle note click correctly', () => {
    const { result } = renderHook(() => useGame(), { wrapper })
    const note: Note = { fullName: 'C4', nameNoOctave: 'C', octave: 4, letter: 'C', accidental: '' }

    act(() => {
      result.current.handleNoteClick(note)
    })

    // Add your assertions here based on your expected state changes
  })

  it('should handle show note names correctly', () => {
    const { result } = renderHook(() => useGame(), { wrapper })

    act(() => {
      result.current.handleShowNoteNames()
    })

    expect(result.current.state.showNoteNames).toBe(true)
  })

  it('should increment scale if last note of current scale is clicked', () => {

  })

  
})