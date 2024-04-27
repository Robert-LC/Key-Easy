import { Note } from './Note'

type KeyProps = {
  x: number
  y: number
  width: number
  height: number
  radius: number
  padding?: number
  note: Note
  // noteStatus?: 'CORRECT' | 'MISSED_CORRECT' | 'NONE'
}

export default KeyProps
