import { ScaleMode } from '../types/Enums'
import { createScaleFromTonal } from './ScaleUtils'
import { randomScale } from './GameUtils'

describe('randomScale', () => {
  it('should return a random scale', () => {
    const scale = randomScale(ScaleMode.Both)
    expect(scale).toBeDefined()
  })

  it('should return a different scale than what currentScale is ', () => {
    const currentScale = createScaleFromTonal('C Major')
    const scale = randomScale(ScaleMode.Major, currentScale)
    expect(scale).not.toBe(currentScale)
  })

  it('should return a scale with the specified mode when mode is provided', () => {
    const scale = randomScale(ScaleMode.Major)
    expect(scale.type).toContain('major')
  })
})
