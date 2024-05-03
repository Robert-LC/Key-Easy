import { ScaleMode } from '../types/Enums'
import { getRandomScale } from './GameUtils'

describe('getRandomScale', () => {
  it('should return a random scale', () => {
    const scale = getRandomScale(ScaleMode.Both)
    expect(scale).toBeDefined()
  })

  it('should return a scale with the specified mode when mode is provided', () => {
    const scale = getRandomScale(ScaleMode.Major)
    expect(scale.type).toContain('major')
  })
})
