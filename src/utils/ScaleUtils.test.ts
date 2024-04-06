import { createScaleFromTonal } from './ScaleUtils'

describe('createScaleFromTonal', () => {
  it('should create a scale object from a given scale name', () => {
    const scale = createScaleFromTonal('C major')
    expect(scale).toBeDefined()
    expect(scale.name).toBe('C major')
    expect(scale.notes).toHaveLength(7)
    expect(scale.tonic).toBe('C')
    expect(scale.type).toContain('major')
  })
})
