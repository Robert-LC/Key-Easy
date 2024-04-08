const SOUNDS_FILE_PATH = '~/public/sounds'

export const playSound = (note: string, volume: number): void => {
  if (volume < 0.0 || volume > 1.0) {
    throw new Error('Volume must be between 0.0 and 1.0')
  }

  const audio = new Audio(`${SOUNDS_FILE_PATH}/${note.toLowerCase()}.mp3`)
  audio.volume = volume
  audio.play()
}
