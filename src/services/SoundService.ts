export const playSound = (noteName: string, volume: number): void => {
  if (volume < 0.0 || volume > 1.0) {
    throw new Error('Volume must be between 0.0 and 1.0')
  }

  const audio = new Audio(`sounds/${noteName.toLowerCase()}.mp3`)
  audio.volume = volume
  audio.play()
}
